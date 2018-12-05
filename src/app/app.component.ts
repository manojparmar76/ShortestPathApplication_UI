import { Component } from '@angular/core';

import { ApiService } from './service/api.service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private apiService: ApiService) {
      this.getNodes();
  }

  private source: String = '';
  private destination: String = '';
  private traffic: Boolean = false;

  private nodes: Array < String >  = [];

  private shortestPath: Object = {};

  private getNodes() {
    this.apiService.getCallback('planets').subscribe(response =>  {
      if (response) {
        if (response.message) {
          alert('Message : ' + response.message);
        } else if (response.length === 0) {
          alert('Message : No node found in database, please upload graph first.');
        } else {
          this.nodes = response;
        }
      }
    });
  }

  private findPath() {
    if (this.source && this.destination) {
      const payload: any =  {};
      payload.source = this.source;
      payload.destination = this.destination;
      if (this.traffic) {
        payload.withTraffic = this.traffic;
      }
      this.apiService.postCallback('shortestPath', payload).subscribe(response =>  {
        if (response) {
          if (response.message) {
            alert('Message : ' + response.message);
          } else {
            this.shortestPath = response;
            setTimeout(() => {
              this.applyLines();
            }, 1000);
          }
        }
      });
    }
  }

  private applyLines() {
    const lastIndex = document.getElementsByClassName('block').length - 1;
    if (lastIndex) {
      const sourceOffset = document.getElementsByClassName('block')[0]['offsetTop'];
      const destinationOffset = document.getElementsByClassName('block')[lastIndex]['offsetTop'];
      const connectingLineHeight = destinationOffset - sourceOffset;
      document.getElementById('connectingLine').style.height = connectingLineHeight + 10 + 'px';
    }
  }

}
