const moment =require('moment-timezone');
moment.tz('America/Los_Angeles')
const _= require('lodash');
var lib = {
    disablePastDate:(current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    },    
    disableFutureDate:(current) => {
        // Can not select days from today
        return current >= moment().endOf('day');
    },
    NumberStringSort:(a, b, col = '') => {
        if (col) {
          if (typeof a[col] === "string" && typeof b[col] === "string") {
            var nameA = a[col] != null ? a[col].toUpperCase() : '';
            var nameB = b[col] != null ? b[col].toUpperCase() : '';
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          } else {
            return a[col] - b[col];
          }
        } else {
          return a - b;
        }
    },
    sortDate:(a, b, col) => {        
        return moment(a[col]).unix() - moment(b[col]).unix()
    },
    isJson:(item) => {      
      item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

      try {
          item = JSON.parse(item);
      } catch (e) {
          return false;
      }

      if (typeof item === "object" && item !== null) {
          return true;
      }

      return false;
    },
    arrFilterItems:(arr, query) => {
      return arr.filter(function(el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
      })
    }, 
}


module.exports=lib