(function(globalSpace, JQuery)
{
	"use strict";

	// ObjectDm do the following three things:
	// 1. It register on events related to the oid its user provides.
	// 2. It provides API to set new value related to a binded object ID.
	//  While binded object's value is being changed, the ObjectDm is responsible to
	// trigger change event related (so subscribers will be be updated automatically).
	// 3. It provides API to get current value related to binded object ID.
	function ObjectDm( oid )
	{
		// ObjectDm uses the DataBinder to do some one-shot registration logic during its init.
		// It must be create with a unique object ID.
		// From that moment the DataBinder start listening for changes on DOM elements
		// marked with data-bind-<object_id>="<property_name>". For every such catch event,
		// it terminates that event with a new one marked as <object_id>:change.
		// In addition the DataBinder register for <object_id>:change events, so when such
		// events are catched, it modify the value for all registered subscribers (note that
		// a subscriber might be HTML tag or some javascript object.
		// This termination provides the required context switch between the publisher and
		// the subscribers.
		function DataBinder( object_id )
		{
			// Use a jQuery object as simple PubSub
			var pubSub = jQuery({});

			// We expect a `data` element specifying the binding
			// in the form: data-bind-<object_id>="<property_name>"
			var data_attr = "bind-" + object_id;
			var message = object_id + ":change";

			// Listen to change events on elements with the data-binding attribute and proxy
			// them to the PubSub, so that the change is "broadcasted" to all connected objects
			jQuery( document ).on( "change", "[data-" + data_attr + "]", function( evt )
			{
				var $input = jQuery( this );

				pubSub.trigger( message, [ $input.data( data_attr ), $input.val() ] );
			});

			// PubSub propagates changes to all bound elements, setting value of
			// input tags or HTML content of other tags
			pubSub.on( message, function( evt, prop_name, new_val )
			{
				jQuery( "[data-" + data_attr + "=" + prop_name + "]" ).each( function()
				{
					var $bound = jQuery( this );

					if ( $bound.is("input, textarea, select") )
					{
						$bound.val( new_val );
					}
					else
					{
						$bound.html( new_val );
					}
				});
			});

			return pubSub;
		}

		var binder = new DataBinder( oid ),

			objectDmPublicApi =
			{
				attributes: {},

				// The attribute setter publish changes using the DataBinder PubSub
				set: function( attr_name, val )
				{
					// store update value locally
					this.attributes[ attr_name ] = val;
					// publish change events to update value of relevant subscribers
					binder.trigger( oid + ":change", [ attr_name, val, this ] );
				},

				get: function( attr_name )
				{
					return this.attributes[ attr_name ];
				},

				_binder: binder
			};

		// Subscribe to the PubSub
		binder.on( oid + ":change", function( evt, attr_name, new_val, initiator )
		{
			if ( initiator !== objectDmPublicApi )
			{
				objectDmPublicApi.set( attr_name, new_val );
			}
		});

		return objectDmPublicApi;
	}

	globalSpace.ObjectDm = ObjectDm;

})(window, jQuery);