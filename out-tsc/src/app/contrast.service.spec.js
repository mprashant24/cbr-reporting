import { TestBed } from '@angular/core/testing';
import { ContrastService } from './contrast.service';
describe('ContrastService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ContrastService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=contrast.service.spec.js.map