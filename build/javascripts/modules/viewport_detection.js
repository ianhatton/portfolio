import _, {forIn, remove} from 'lodash';

export default class ViewPortDetection{
  constructor(callback){
    this.breakpoints = {
      mobile: {
        start: 0
        , end: 767
      }
      , tablet: {
        start: 768
        , end: 992
      }
      , desktop: {
        start: 993
        , end: 'max'
      }
    };

    this.currentWidth = 0;
    this.callbacks = [];
    this.trackerCalled = false;
    if (_.isFunction(callback)){
      this.id = this.addCallback(cb);
    }

    var bum = this.getDevice();
    console.log('bum', bum);
  }

  init(){
    window.addEventListener('orientationchange', this.resizeFn, false);
    window.addEventListener('resize', this.resizeFn, false);
  }

  addCallback(callback){
    if (_.isFunction(callback)){
      this.id = _.uniqueId();
      this.callbacks.push({ cb: callback, id: this.id });
    } else {
      throw new Error("Not a function");
    }

    return this.id;
  }

  checkWidths(windowWidth, start, end){
    if (end === 'max' && windowWidth >= start){
      return true;
    }

    return (windowWidth >= start && windowWidth <= end);
  }

  getDevice(){
    let device = 'desktop';
    const windowWidth = this.getWindowSize().width;

    Object.keys(this.breakpoints).forEach((key)=>{
      let value = this.breakpoints[key];

      if (this.checkWidths(windowWidth, value.start, value.end)){
        device = key;
      }
    });

    return device;
  }

  getWindowSize(){
    return {
      height: window.innerHeight
      , width: window.innerWidth
    };
  }

  resizeFn(){
    if(this.sizeChange()){
      this.runCallBacks(this.windowSize);
    }
  }

  runCallBacks(size){
    const device = this.getDevice(size.width);

    _.forEach(this.callbacks, (calls)=>{
      calls.cb(device, size);
    });
  }

  sizeChange(){
    if(this.currentWidth === this.windowSize().width){
      return false;
    }

    this.currentWidth = this.windowSize().width;

    return true;
  }

  trackSize(callback){
    const id = this.addCallback(callback);

    if (!this.trackerCalled){
      window.addEventListener('DOMContentLoaded', this.init.bind(this), false);
    }

    return id;
  }
}
