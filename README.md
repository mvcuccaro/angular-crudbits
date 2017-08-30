# angular-crudbits
Angular directive for setting bitwise values for common crud type bits.  It allows the developer to easily provide to a view, a block of html that contains 4 checkboxes.  The directive provides an exportable realtime value that is the sum of all the checked bits.  This is very useful when you want to use bitwise math to do things like assign entitlements to users.   The name might be a bit misleading since I dont actually use the CRUD naming convention for my entitlement bits.  I use search, insert, update and remove  (1, 2, 4, 8 ) respectively.  If someone was adamant about using the standard CRUD naming convention - i imagine it would be pretty easy to edit for that preference. 

## Getting Started
Download src/crudbits.anuglar.directive.js and include it in your angular app with a script element
```
<script type="text/javascript" src="crudbits.angular.js"></script>
````

### Implementing
The portable directive when included is a variable called directive_mvc_crudbits that can be assigned as a directive in the angular way...


```
app.directive('crudBits', directive_mvc_crudbits);
```

Then you can use the html element crud-bits in your html view. In the following example. entitlement.value is a value in your controller scope. By assigning it to the bitvalue tag, it will be updated
with a sum of all checked bits anytime a checkbox is checked or unchecked.

```
<crud-bits bitvalue="entitlement.value"></crud-bits>  
```

If you plan to use this directive in a repeat, you will need to provide the current index of the repeat like so 

```
<div ng-repeat="(index, entitlement) in entitlements" class="entitlement_box">
    <span class="entitlement_key">{{ entitlement.name }}:</span>
    <span><input type="text" ng-model="entitlements[index].value"></span>
	<crud-bits bitvalue="entitlements[index].value" rindex="{{ index }}"></crud-bits>                        
</div>
```

In the above example - a bunch of entitlement values from the controller are used to create a repeated list of crud-bit directives that take an index value in the rindex tag.  The example also provides a text input that will update in realtime with the sum of all bits value provided by the directive on check and uncheck events

## Authors

* **Michael Cuccaro** - [mvcuccaro](https://github.com/mvcuccaro)
