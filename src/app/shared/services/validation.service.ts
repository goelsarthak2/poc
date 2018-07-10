import { Injectable } from '@angular/core';
import { DataService} from '../services/data.service'

@Injectable()
export class AuthService {
  constructor(private dataService : DataService) {}
  public isAuthenticated(): boolean {
    const status = this.dataService.checkedStatus();    
    return status;
  }
}