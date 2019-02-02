import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegionService } from '../../../providers/region.service';

declare var ol: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	private code: string;
	private region: any;
	private map: any;
	private raster: any; 
	private source: any;
	private vector: any; 
	private draw: any;
	private snap: any;
	
	constructor(private route: ActivatedRoute, private regionService: RegionService) {
		route.params.subscribe(params => {
			this.code = params['code']; 
			this.getRegion();
		});
	}

	ngOnInit() {

	}

	addRegionMap(){
		this.raster = new ol.layer.Tile({
        	source: new ol.source.XYZ({
              url: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}"
            })
      	});

		let format = new ol.format.GeoJSON();
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
		this.source = new ol.source.Vector({features: features_reprojected});

		this.vector = new ol.layer.Vector({
			source: this.source,
			style: new ol.style.Style({
			  fill: new ol.style.Fill({
			    color: 'rgba(255, 255, 255, 0.2)'
			  }),
			  stroke: new ol.style.Stroke({
			    color: '#ffcc33',
			    width: 2
			  }),
			  image: new ol.style.Circle({
			    radius: 7,
			    fill: new ol.style.Fill({
			      color: '#ffcc33'
			    })
			  })
			})
		});

		this.map = new ol.Map({
			layers: [this.raster, this.vector],
			target: "map",
			view: new ol.View({
			  center: ol.extent.getCenter(features_reprojected[0].getGeometry().getExtent()),
			  zoom: 13,
			})
		});
	}

	public getRegion(){
	    this.regionService.getRegion(this.code).subscribe(
	      response => {
	        this.region = response;
	        console.log(this.region)
	        this.addRegionMap()
	      },
	      error => {
	        console.log(error);
	      }
	    );
	  }

}
