import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Stage } from './stage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class StageService {

    private resourceUrl =  SERVER_API_URL + '/interactions/api/stages';
    private resourceSearchUrl = SERVER_API_URL + '/interactions/api/_search/stages';

    constructor(private http: Http) { }

    create(stage: Stage): Observable<Stage> {
        const copy = this.convert(stage);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(stage: Stage): Observable<Stage> {
        const copy = this.convert(stage);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Stage> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Stage.
     */
    private convertItemFromServer(json: any): Stage {
        const entity: Stage = Object.assign(new Stage(), json);
        return entity;
    }

    /**
     * Convert a Stage to a JSON which can be sent to the server.
     */
    private convert(stage: Stage): Stage {
        const copy: Stage = Object.assign({}, stage);
        return copy;
    }
}
