angular.module('AppUI')

.directive("fileImage", [function () {
    return {
        scope: {
            fileimage: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    //scope.$apply(function () {
                    //    scope.fileread = loadEvent.target.result;
                    //});

                    //get dimension of image
                    var image = new Image();
                    image.src = loadEvent.target.result;

                    image.onload = function () {
                        // access image size here 

                        if (attributes.maxwidth >= this.width && attributes.maxheight >= this.height) {
                            scope.$apply(function () {
                                scope.fileimage = loadEvent.target.result;
                            });
                        }
                        else {
                            //throw 'Invalid image size!';
                            scope.$emit('Image.Validation', {
                                message: 'Invalid image size! Please choose another one.\n' +
                                        'Valid size is max ' + attributes.maxwidth + ' width and ' + attributes.maxheight + ' height\n' +
                                        'but your image size is ' + this.width + ' width and ' + this.height + ' height'
                            });
                        }
                    };
                }
                reader.readAsDataURL(changeEvent.target.files[0]);

                //if only file definition
                //scope.$apply(function () {
                //    scope.fileimage = changeEvent.target.files[0];
                //     or all selected files:
                //     scope.fileread = changeEvent.target.files;
                //});

            });
        }
    }
}]);