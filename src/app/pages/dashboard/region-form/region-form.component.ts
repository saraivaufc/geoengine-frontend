import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { RegionService } from '../../../providers/region.service';

declare var ol: any;

@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styleUrls: ['./region-form.component.css'],
})
export class RegionFormComponent implements OnInit {
	private code: string;
	private types: Array<object> = [
		{label: "Point", value:"Point"},
		{label: "LineString", value:"LineString"},
		{label: "Polygon", value:"Polygon"},
		{label: "Circle", value:"Circle"}
	];
	private typeSelect: string = "Polygon";
	private map: any;
	private raster: any; 
	private source: any;
	private vector: any; 
	private draw: any;
	private snap: any;
	
	region = {
		code: '',
		start_date: '',
		geometry: '', 
	}

	constructor(
		private route: ActivatedRoute, 
		private regionService: RegionService, 
		private router: Router) {
		route.params.subscribe(params => {
			this.code = params['code']; 
		});
	}

	ngOnInit() {
	    this.raster = new ol.layer.Tile({
        	source: new ol.source.XYZ({
              url: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}"
            })
      	});

		this.source = new ol.source.Vector();

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
			target: 'map',
			view: new ol.View({
			  center: [-5874422,-1638542],
			  zoom: 4,
			})
		});

		var modify = new ol.interaction.Modify({source: this.source});
		
		this.map.addInteraction(modify);

		this.addInteractions();
	}

	onUpdateType(event){
		this.typeSelect = event.target.value;
		console.log("change type...")
		console.log(this.source)
		console.log(this.vector)
		this.map.removeInteraction(this.draw);
		this.map.removeInteraction(this.snap);
		this.addInteractions();		
	}

	addInteractions() {
		this.draw = new ol.interaction.Draw({
		  source: this.source,
		  type: this.typeSelect
		});
		this.draw.on('drawend', (event) => this.addGeometryInTextArea(event.feature));
		this.map.addInteraction(this.draw);
		this.snap = new ol.interaction.Snap({source: this.source});
		this.map.addInteraction(this.snap);
	}

	addGeometryInTextArea(feature){
		console.log(feature);
		let format = new ol.format.WKT();
		let geometry_reprojected = feature.getGeometry().transform("EPSG:3857", "EPSG:4326");
		console.log(geometry_reprojected)
		var wkt = format.writeGeometry(geometry_reprojected);
		this.region.geometry = wkt;
	}

	addRegion(){
		let region = {
			code: this.region.code,
			start_date: this.region.start_date,
			geometry: this.region.geometry,
		}
		console.log("Task region: ", region)

		this.regionService.postRegion(region).subscribe(
			response => {
				console.log(response);
				alert("Sua tarefa foi criada com sucesso!");
				setTimeout(() => {
		           this.router.navigate(['/dashboard/regions']);
		        }, 2000);
			},
			error => {
				console.log(error);
			}
		);
	}
}

