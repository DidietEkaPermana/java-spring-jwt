angular.module('AppUI')

.factory('utility', function () {
    return {
        searchData: function(dataSearch, children, id) {
            for (var i = 0; i < dataSearch.length; i++) {
                if (dataSearch[i][children] == id)
                    return dataSearch[i];

                if (dataSearch[i].nodes) {
                    var find = searchData(dataSearch[i].nodes, children, id);

                    if (find != null)
                        return find;
                }
            }

            return null;
        },


        /*
         * RFC4122 allows random ("version 4") ids
         * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
         */
        generateGUID: function(){
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        }
    }
})