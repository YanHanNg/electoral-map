import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { GeoJSONData } from '../models/geojson.interface';

@Component({
  selector: 'app-electoral-map',
  standalone: true,
  imports: [],
  templateUrl: './electoral-map.component.html',
  styleUrl: './electoral-map.component.css'
})
export class ElectoralMapComponent implements OnInit, AfterViewInit {

  private map!: L.Map;
  markers: L.Marker[] = 
  [
    L.marker([1.3649, 103.8228]),
  ];

  uniqueGRC: string[] = [];

  grcColorMap: { [key: string]: string } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.centerMap();
    this.loadBoundaryData();
    this.addIconsOfContesting();
  }

  private loadBoundaryData() {
    this.http.get('assets/electoral-boundary/ElectoralBoundary2025GEOJSON.geojson').subscribe((data: any) => {
      let boundaryGeojson: GeoJSONData = data;
      boundaryGeojson.features.forEach( feature => {
        this.grcColorMap[feature.properties['ED_DESC_FU']] = this.getRandomColor();  // Remove the extra dot
      });

      L.geoJSON(data, {
        style: (feature: any) => {
          const color = this.grcColorMap[feature.properties.ED_DESC_FU] || '#999999'; // Default gray if not found
          return { color: color };
        },
        onEachFeature: (feature, layer) => {
          layer.bindPopup(this.popContextData(feature));
          layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight,
            click: this.zoomToFeature,
          })
        }
      }).addTo(this.map);

      // L.geoJSON(data, {
      //   style: this.getStyle,
      //   onEachFeature: this.onEachFeature
      // }).addTo(this.map);
    });
  }

  private initMap() {
    const baseMapURl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }


  private centerMap() {
    // Create a boundary based on the markers
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    
    // Fit the map into the boundary
    this.map.fitBounds(bounds);
    this.map.setMinZoom(12)
    this.map.setZoom(12);
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private getStyle(feature: any) {
    return {
      fillColor: this.getRandomColor(),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  zoomToFeature(e: any) {
    this.map.fitBounds(e.target.getBounds());
  }

  highlightFeature(e:any) {
    let layer = e.target;

    // layer.setStyle({
    //   weight: 5,
    //   color: '#666',
    //   dashArray: '',
    //   fillOpacity: 0.7,
    // });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  resetHighlight(e: any) {
    L
  }

  private onEachFeature(feature: any, layer: L.Layer) {
    layer.on({
      mouseover: this.highlightFeature.bind(this),
      click: this.highlightFeature.bind(this)
    });
  }

  popContextData(data: any): string {
    let html = `
      <div>
        <div>Contesting: ${data.properties['ED_DESC_FU']}</div>
        <div style="margin-top: 10px;">
    `;
  
    for (const info of data.properties['GEINFO']) {
      html += `
        <div style="margin-bottom: 8px;">
          <strong>Party:</strong> ${info.party}<br/>
          <strong>Members:</strong> ${info.members}
        </div>
      `;
    }
  
    html += `
        </div>
      </div>
    `;
  
    console.log(html);
    return html;
  }

  addIconsOfContesting() {
    var vsIcon = {
      icon: L.icon({
        iconSize: [ 25, 35 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: '../assets/logo/VS.png'
      })
    }

    var papIcon = {
      icon: L.icon({
        iconSize: [ 25, 35 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: '../assets/logo/PAP_logo.png'
      })
    };

    var pspIcon = {
      icon: L.icon({
        iconSize: [ 25, 35 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: '../assets/logo/PSP_logo.png'
      })
    };

    var sdpIcon = {
      icon: L.icon({
        iconSize: [ 25, 35 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: '../assets/logo/SDP_logo.png'
      })
    };

    var nspIcon = {
      icon: L.icon({
        iconSize: [ 25, 35 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: '../assets/logo/NSP_logo.png'
      })
    };

    var rduIcon = {
      icon: L.icon({
        iconSize: [ 25, 35 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: '../assets/logo/RDU_logo.png'
      })
    };

    var parIcon = {
      icon: L.icon({
        iconSize: [ 25, 35 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: '../assets/logo/PAR_logo.png'
      })
    };

    var sppIcon = {
      icon: L.icon({
        iconSize: [ 25, 35 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: '../assets/logo/SPP_logo.png'
      })
    };

    var wpIcon = {
      icon: L.icon({
        iconSize: [ 25, 35 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: '../assets/logo/WP_logo.png'
      })
    };

    var pppIcon = {
      icon: L.icon({
        iconSize: [ 25, 35 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: '../assets/logo/PPP_logo.png'
      })
    };

    var supIcon = {
      icon: L.icon({
        iconSize: [ 25, 35 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: '../assets/logo/SUP_logo.png'
      })
    };

    var sdaIcon = {
      icon: L.icon({
        iconSize: [ 25, 35 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: '../assets/logo/SDA_logo.png'
      })
    };


    // Mark Jurong Cost Jurong GRC
    var papWestCoastJurongMarker = L.marker([1.3223, 103.6768], papIcon).addTo(this.map);
    var WestCoastJurongMarker = L.marker([1.3223, 103.6868], vsIcon).addTo(this.map);
    var pspWestCoastJurongMarker = L.marker([1.3223, 103.6968], pspIcon).addTo(this.map);

    // Mark Pionner SMC
    var papPioneerMarker = L.marker([1.3402, 103.6960], papIcon).addTo(this.map);
    var pioneerMarker = L.marker([1.3402, 103.7000], vsIcon).addTo(this.map);
    var pspJurongMarker = L.marker([1.3402, 103.7040], pspIcon).addTo(this.map);

    // CCK GRC
    var papCCKMarker = L.marker([1.3985, 103.6901], papIcon).addTo(this.map);
    var cckMarker = L.marker([1.3985, 103.7001], vsIcon).addTo(this.map);
    var pspCCKMarker = L.marker([1.3985, 103.7101], pspIcon).addTo(this.map);

    // MARSILING YEW TEE GRC
    var papYTMarker = L.marker([1.4288, 103.7608], papIcon).addTo(this.map);
    var ytMarker = L.marker([1.4288, 103.7708], vsIcon).addTo(this.map);
    var sdpYTMarker = L.marker([1.4288, 103.7808], sdpIcon).addTo(this.map);

    // Sembawang GRC
    var nspSBWMarker = L.marker([1.4700, 103.8127], nspIcon).addTo(this.map);
    var papSBWMarker = L.marker([1.4599, 103.8047], papIcon).addTo(this.map);
    var vsSBWIcon = L.marker([1.4599, 103.8127], vsIcon).addTo(this.map);
    var sdpYTMarker = L.marker([1.4599, 103.8207], sdpIcon).addTo(this.map);

    // Sembawang SMC
    var papSBWSMCMarker = L.marker([1.4455, 103.7960], papIcon).addTo(this.map);
    var vsSBWSMCIcon = L.marker([1.4455, 103.7980], vsIcon).addTo(this.map);
    var sdpSBWSMCMarker = L.marker([1.4455, 103.8000], sdpIcon).addTo(this.map);

    // NEE SOON GRC
    var papNSMarker = L.marker([1.4288, 103.8170], papIcon).addTo(this.map);
    var vsNSIcon = L.marker([1.4288, 103.8270], vsIcon).addTo(this.map);
    var rduNSMarker = L.marker([1.4288, 103.8370], rduIcon).addTo(this.map);

    // HOLLAND GRC
    var papNSMarker = L.marker([1.3788, 103.7898], papIcon).addTo(this.map);
    var vsNSIcon = L.marker([1.3688, 103.7898], vsIcon).addTo(this.map);
    var rduNSMarker = L.marker([1.3588, 103.7898], rduIcon).addTo(this.map);

    // BP SMC
    var papBPSMCMarker = L.marker([1.3788, 103.7700], papIcon).addTo(this.map);
    var vsBPSMCIcon = L.marker([1.3788, 103.7720], vsIcon).addTo(this.map);
    var sdpBPSMCMarker = L.marker([1.3788, 103.7740], sdpIcon).addTo(this.map);

    // BG SMC
    var papBGSMCMarker = L.marker([1.3618, 103.7550], papIcon).addTo(this.map);
    var vsBGSMCIcon = L.marker([1.3618, 103.7600], vsIcon).addTo(this.map);
    var sdpBGSMCMarker = L.marker([1.3618, 103.7650], sdpIcon).addTo(this.map);

    // JURONG SMC
    var papJurongSMCMarker = L.marker([1.3500, 103.7230], papIcon).addTo(this.map);
    var vsJurongSMCIcon = L.marker([1.3500, 103.7270], vsIcon).addTo(this.map);
    var rduJurongSMCMarker = L.marker([1.3500, 103.7310], rduIcon).addTo(this.map);

    // Jurong East BB GRC
    var papJEBBGRCMarker = L.marker([1.3530, 103.7450], papIcon).addTo(this.map);
    var vsJEBBGRCIcon = L.marker([1.3470, 103.7450], vsIcon).addTo(this.map);
    var rduJGEBBGRCMarker = L.marker([1.3410, 103.7450], rduIcon).addTo(this.map);

    // Tanjong Pagar GRC
    var papTPGRCMarker = L.marker([1.3148, 103.8050], papIcon).addTo(this.map);
    var vsTPGRCIcon = L.marker([1.3148, 103.8150], vsIcon).addTo(this.map);
    var parTPGRCMarker = L.marker([1.3148, 103.8250], parIcon).addTo(this.map);

    // Queenstown SMC
    var papQSMCMarker = L.marker([1.2960, 103.8050], papIcon).addTo(this.map);
    var vsQSMCIcon = L.marker([1.2920, 103.8050], vsIcon).addTo(this.map);
    var parQSMCMarker = L.marker([1.2880, 103.8050], parIcon).addTo(this.map);

    // Radin Mas
    var darrylIcon = {
      icon: L.icon({
        iconSize: [ 25, 35 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: '../assets/logo/Darryl-Lo-Kar-Keong.png'
      })
    };
    var darrylRMSMCMarker = L.marker([1.2520, 103.8327], darrylIcon).addTo(this.map);
    var papRMSMCMarker = L.marker([1.2470, 103.8267], papIcon).addTo(this.map);
    var vsRMSMCIcon = L.marker([1.2470, 103.8327], vsIcon).addTo(this.map);
    var parRMSMCMarker = L.marker([1.2470, 103.8387], parIcon).addTo(this.map);

    // Bishan TPY GRC
    var papBTPYGRCMarker = L.marker([1.3468, 103.8250], papIcon).addTo(this.map);
    var vsBTPYGRCIcon = L.marker([1.3468, 103.8350], vsIcon).addTo(this.map);
    var sppBTPYGRCMarker = L.marker([1.3468, 103.8450], sppIcon).addTo(this.map);

    // Kebun Baru SMC
    var papKBSMCMarker = L.marker([1.3888, 103.8250], papIcon).addTo(this.map);
    var vsKBSMCIcon = L.marker([1.3838, 103.8250], vsIcon).addTo(this.map);
    var sppKBSMCMarker = L.marker([1.3788, 103.8250], sppIcon).addTo(this.map);

    // YCK SMC
    var papYCKSMCMarker = L.marker([1.3918, 103.8390], papIcon).addTo(this.map);
    var vsYCKSMCIcon = L.marker([1.3868, 103.8390], vsIcon).addTo(this.map);
    var parYCKSMCMarker = L.marker([1.3818, 103.8390], parIcon).addTo(this.map);

    // JALAN KAYU SMC
    var papJKSMCMarker = L.marker([1.4088, 103.8530], papIcon).addTo(this.map);
    var vsJKSMCIcon = L.marker([1.4088, 103.8630], vsIcon).addTo(this.map);
    var wpJKSMCMarker = L.marker([1.4088, 103.8730], wpIcon).addTo(this.map);

    // AMK GRC
    var pppAMKGRCMarker = L.marker([1.3878, 103.8630], pppIcon).addTo(this.map);
    var papAMKGRCMarker = L.marker([1.3828, 103.8530], papIcon).addTo(this.map);
    var vsAMKGRCIcon = L.marker([1.3828, 103.8630], vsIcon).addTo(this.map);
    var supAMKGRCMarker = L.marker([1.3828, 103.8730], supIcon).addTo(this.map);

    // MP GRC
    var papMPGRCMarker = L.marker([1.3328, 103.8930], papIcon).addTo(this.map);

    // ALLJUNIED GRC
    var papALGRCMarker = L.marker([1.3590, 103.8980], papIcon).addTo(this.map);
    var vsALGRCIcon = L.marker([1.3590, 103.9080], vsIcon).addTo(this.map);
    var wpALGRCMarker = L.marker([1.3590, 103.9180], wpIcon).addTo(this.map);

    // SENG KANG GRC
    var papSKGRCMarker = L.marker([1.3958, 103.8910], papIcon).addTo(this.map);
    var vsSKGRCIcon = L.marker([1.3958, 103.8960], vsIcon).addTo(this.map);
    var wpSKGRCMarker = L.marker([1.3958, 103.9010], wpIcon).addTo(this.map);

    // PUNGGOL GRC
    var papPunggolGRCMarker = L.marker([1.4128, 103.9010], papIcon).addTo(this.map);
    var vsPunggonGRCIcon = L.marker([1.4128, 103.9060], vsIcon).addTo(this.map);
    var wpPunggolGRCMarker = L.marker([1.4128, 103.9110], wpIcon).addTo(this.map);

    // Pasir ris GRC
    var papPRGRCMarker = L.marker([1.3628, 103.9810], papIcon).addTo(this.map);
    var vsPRGRCIcon = L.marker([1.3628, 103.9910], vsIcon).addTo(this.map);
    var sdaPRGRCMarker = L.marker([1.3628, 104.0010], sdaIcon).addTo(this.map);

    // TAMPINES GRC
    var nspTGRCMarker = L.marker([1.3670, 103.9410], nspIcon).addTo(this.map);
    var papTGRCMarker = L.marker([1.3590, 103.9330], papIcon).addTo(this.map);
    var vsTGRCIcon = L.marker([1.3590, 103.9410], vsIcon).addTo(this.map);
    var pppTGRCMarker = L.marker([1.3590, 103.9490], pppIcon).addTo(this.map);
    var wpGRCMarker = L.marker([1.3510, 103.9410], wpIcon).addTo(this.map);

    // T CHANGKAT SMC
    var papTCSMCMarker = L.marker([1.3430, 103.9410], papIcon).addTo(this.map);
    var vsTCSMCIcon = L.marker([1.3460, 103.9460], vsIcon).addTo(this.map);
    var wpTCSMCMarker = L.marker([1.3490, 103.9510], wpIcon).addTo(this.map);

    // EAST COAST GRC
    var papECGRCMarker = L.marker([1.3270, 103.9380], papIcon).addTo(this.map);
    var vsECGRCIcon = L.marker([1.3270, 103.9480], vsIcon).addTo(this.map);
    var wpECGRCMarker = L.marker([1.3270, 103.9580], wpIcon).addTo(this.map);

    // MOUNTBATTEN SMC
    var jeremyIcon = {
      icon: L.icon({
        iconSize: [ 25, 35 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: '../assets/logo/Tan-Wei-Yang,-Jeremy.png'
      })
    };
    var papMBSMCMarker = L.marker([1.3020, 103.8780], papIcon).addTo(this.map);
    var vsMBSMCIcon = L.marker([1.3020, 103.8830], vsIcon).addTo(this.map);
    var jeremyMBSMCMarker = L.marker([1.3020, 103.8880], jeremyIcon).addTo(this.map);

    // JALAN BESAR GRC
    var papJBGRCMarker = L.marker([1.3220, 103.8598], papIcon).addTo(this.map);
    var vsJBGRCIcon = L.marker([1.3120, 103.8598], vsIcon).addTo(this.map);
    var parJBGRCMarker = L.marker([1.3020, 103.8598], parIcon).addTo(this.map);

    // POTONG PASIR SMC
    var papPPSMCMarker = L.marker([1.3410, 103.8710], papIcon).addTo(this.map);
    var parPPSMCCMarker = L.marker([1.3360, 103.8660], parIcon).addTo(this.map);
    var vsppSMCCIcon = L.marker([1.3360, 103.8710], vsIcon).addTo(this.map);
    var sppPPSMCMarker = L.marker([1.3360, 103.8760], sppIcon).addTo(this.map);
  }
}
