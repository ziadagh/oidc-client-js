import Log from './Log';
import Window from './Window';

export default class AuthorizationResultParser {
    
    constructor(window = Window){
        this._window = window;
    }
    
    parseResult(value) {
        value = value || this._window.location.hash;
        
        var idx = value.lastIndexOf("#");
        if (idx >= 0) {
            value = value.substr(idx + 1);
        }

        var params = {},
            regex = /([^&=]+)=([^&]*)/g,
            m;

        var counter = 0;
        while (m = regex.exec(value)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            if (counter++ > 50) {
                Log.error("AuthorizationResultParser.parseResult: response exceeded expected number of parameters", value);
                
                return {
                    error: "Response exceeded expected number of parameters"
                };
            }
        }

        for (var prop in params) {
            return params;
        }
    }
    
}
