/**
 * @aauthor Michael Cuccaro
 * @see https://github.com/mvcuccaro
 * 
 * directive to create a 4 checkbox input control for setting crud bits (search 1, insert 2, update 3, remove 4)
 * The directive binds to an external value via the "bitvalue" attribute which will be the sum of all bits checked in the control
 * 
 * @return     {angular directive}  { returns an angular directive}
 */
var directive_mvc_crudbits = function() {
    //app.directive('crudBits', function() {
    var static_bits	= {
    	search: 	1,
    	insert: 	2,
    	update: 	4,
    	remove: 	8
    };

    var controller = function($scope, $element, $attrs){
        /**
         * Check the current bit value and see if it contains the bit of the type requested in arg_type
         *
         * @param      {string} The type of the bit (search, insert, update or remove)
         * @return     {int}    The contained bit or zero if bit value does not contain the bit
         */
    	$scope.checkBitValue  = function(arg_type){
    		return $scope.bitvalue & static_bits[arg_type];
    	}

        /**
         * Add up all the checked bits and set the bound bitvalue to the sum
         */
    	$scope.updateBitValue = function(){
            //sets the index to 0 if there is no index provided.
            var rindex = angular.isUndefined($attrs.rindex) ? 0 : $attrs.rindex;

            //add up all the checked bits
    		var new_bit_value	= $element.find('#crud_bits_search_checkbox_' + rindex).prop('checked') == true ? static_bits.search : 0;
    		new_bit_value		+= $element.find('#crud_bits_insert_checkbox_' + rindex).prop('checked') == true ? static_bits.insert : 0;
    		new_bit_value		+= $element.find('#crud_bits_update_checkbox_' + rindex).prop('checked') == true ? static_bits.update : 0;
    		new_bit_value		+= $element.find('#crud_bits_remove_checkbox_' + rindex).prop('checked') == true ? static_bits.remove : 0;
    		
            //update the bound value
   			$scope.bitvalue = new_bit_value;
    	}
    };

    return {
    	restrict: 'AE',
    	replace: 'true',
    	scope: { 
    		bitvalue: 	'=',
    		rindex: 	'@'
    	},
    	template: '<div class="crud-bits-container">'
    		+ 'S:<input id="crud_bits_search_checkbox_{{ rindex }}" type="checkbox" ng-checked="checkBitValue(\'search\')" ng-click="updateBitValue()">'
    		+ 'I:<input id="crud_bits_insert_checkbox_{{ rindex }}" type="checkbox" ng-checked="checkBitValue(\'insert\')" ng-click="updateBitValue()">'
    		+ 'U:<input id="crud_bits_update_checkbox_{{ rindex }}" type="checkbox" ng-checked="checkBitValue(\'update\')" ng-click="updateBitValue()">'
    		+ 'R:<input id="crud_bits_remove_checkbox_{{ rindex }}" type="checkbox" ng-checked="checkBitValue(\'remove\')" ng-click="updateBitValue()">'
    		+ '</div>',
    	controller: controller
    };
};
