import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
let ContrastService = class ContrastService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    setConnectionDetails(teamserverURL, orgId, username, apiKey, serviceKey) {
        this.teamServerURL = teamserverURL;
        this.orgId = orgId;
        this.username = username;
        this.apiKey = apiKey;
        this.serviceKey = serviceKey;
    }
    getApplicationForOrg(expand) {
        var url = this.teamServerURL + "/ng/" + this.orgId + "/applications/filter?expand=license";
        return this.makeAPICall(url);
    }
    makeAPICall(url) {
        var encodedAuthInformation = btoa(this.username + ":" + this.serviceKey);
        var headers = new HttpHeaders({
            "Authorization": encodedAuthInformation,
            'API-Key': this.apiKey,
            'accept': 'application/json'
        });
        var params = {
            'method': 'GET',
            'muteHttpExceptions': true,
            'headers': headers
        };
        var result = undefined;
        this.httpClient.get(url, { headers: headers }).subscribe(res => result = res.json());
        return JSON.parse(result);
    }
    extractData(res) {
        let body = res;
        return body || {};
    }
};
ContrastService = __decorate([
    Injectable()
], ContrastService);
export { ContrastService };
//# sourceMappingURL=contrast.service.js.map