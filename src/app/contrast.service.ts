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
    var url = this.teamServerURL + "/api/ng/" + this.orgId + "/applications/filter?expand=" + expand;
    return this.makeAPICall(url);
  }

  public getVulnTrend() {
    var url = this.teamServerURL + "/api/ng/" + this.orgId + "/orgtraces/stats/trend/year/new";
    return this.makeAPICall(url);
  }

  getAssessLicenseDetails() {
    var url = this.teamServerURL + "/api/ng/" + this.orgId + "/licenses";
    return this.makeAPICall(url);
  }

  getProtectLicenseDetails() {
    var url = this.teamServerURL + "/api/ng/" + this.orgId + "/rasp/licenses";
    return this.makeAPICall(url);
  }

  private async makeAPICall(url: string): Promise<any>{
    var encodedAuthInformation = btoa(this.username + ":" + this.serviceKey);
    let reqHeaders = new HttpHeaders()
      .set("Authorization", encodedAuthInformation)
      .set('API-Key', this.apiKey)
      .set('accept', 'application/json');
    let result = await this.httpClient.get<any>(url, { headers: reqHeaders }).toPromise().then(this.extractData).catch(this.extractData);
    return result;
  }

  private extractData(res: Response) {
    if(res instanceof HttpErrorResponse)
      return res.error;
    return res;
  }

}
