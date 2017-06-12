export class Eventdetail {
  public _id: string;
  public titel: string;
  public links: {};
  public times: {};
  public band: string;
  public date: any;
  public published: boolean;
  public public: boolean;
  public documents: any;

   constructor(_ident: string, _titel: string, _band: string) {
  this._id = _ident;
  this.titel = _titel;
  this.band = _band;
}
}
