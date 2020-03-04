import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ContrastService {

  teamServerURL: string;
  orgId: string;
  username: string;
  apiKey: string;
  serviceKey: string;

  constructor(private httpClient: HttpClient) { }

  public setConnectionDetails(teamserverURL: string, orgId: string, username: string, apiKey: string, serviceKey: string): void {
    this.teamServerURL = teamserverURL;
    this.orgId = orgId;
    this.username = username;
    this.apiKey = apiKey;
    this.serviceKey = serviceKey;
  }

  public getApplicationForOrg(expand: string) {
    var url = "https://contrast-cors.azurewebsites.net/" + this.teamServerURL + "api/ng/" + this.orgId + "/applications/filter?expand=" + expand;
    return this.makeAPICall(url);
  }

  public getVulnTrend() {
    var url = "https://contrast-cors.azurewebsites.net/" + this.teamServerURL + "api/ng/" + this.orgId + "/orgtraces/stats/trend/year/new";
    return this.makeAPICall(url);
  }

  private async makeAPICall(url: string): Promise<any>{
    var encodedAuthInformation = btoa(this.username + ":" + this.serviceKey);
    let reqHeaders = new HttpHeaders()
      .set("Authorization", encodedAuthInformation)
      .set('API-Key', this.apiKey)
      .set('accept', 'application/json');
    let result = await this.httpClient.get<any>(url, { headers: reqHeaders }).toPromise().then(this.extractData).catch(this.handleError);
    return result;
  }

  private extractData(res: Response) {
    return res;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
