import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../providers/api.service';
import { environment } from 'src/environments/environment';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Tile, Vector as VectorLayer } from 'ol/layer.js';
import { Vector as VectorSource, XYZ } from 'ol/source.js';
import { Fill, Stroke, Style, Circle } from 'ol/style.js';
import { GeoJSON } from 'ol/format.js';
import { getCenter } from 'ol/extent.js'

@Component({
  selector: 'app-region-details',
  templateUrl: './region-details.component.html',
  styleUrls: ['./region-details.component.css']
})
export class RegionDetailsComponent implements OnInit {

	@Input() id: string;	
	
	private region: any;
	private map: any;
	private raster: any; 
	private source: any;
	private vector: any; 
	private draw: any;
	private snap: any;
	
	constructor(private apiService: ApiService) {
	}

	ngOnInit() {
		this.loadRegion(this.id);
	}

	public loadRegion(id){
		this.apiService.get(environment.endpoints.regions_details, {"pk": id}, {}).subscribe(
		  response => {
			this.region = response;
			console.log("Region: ", this.region)
			this.addRegionMap()
		  },
		  error => {
			console.log("Error:", error);
		  }
		);
	}

	addRegionMap(){
		this.raster = new Tile({
			source: new XYZ({
			  url: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}"
			})
		});

		let format = new GeoJSON();
		let features = format.readFeatures(this.region.geometry)
		console.log("Features: ", features)
		var features_reprojected = [];
		features.forEach(function(feature){
			let geometry_reprojected = feature.getGeometry().transform("EPSG:4326", "EPSG:3857");	
			feature.setGeometry(geometry_reprojected)
			features_reprojected.push(feature)
		})
		// {
		// 	features:format.readFeatures(this.region.geometry)
		// }
		this.source = new VectorSource({features: features_reprojected});

		this.vector = new VectorLayer({
			source: this.source,
			style: new Style({
			  fill: new Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			  }),
			  stroke: new Stroke({
				color: '#ffcc33',
				width: 2
			  }),
			  image: new Circle({
				radius: 7,
				fill: new Fill({
				  color: '#ffcc33'
				})
			  })
			})
		});

		this.map = new Map({
			layers: [this.raster, this.vector],
			target: "map",
			view: new View({
			  center: getCenter(features_reprojected[0].getGeometry().getExtent()),
			  zoom: 13,
			})
		});
	}

}
