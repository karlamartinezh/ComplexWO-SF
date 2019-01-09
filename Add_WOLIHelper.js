({
    
    helperRectifySequence : function(component,event) {
        
        var indexNo= component.get("v.indexNo");
        var New=parseInt(indexNo)+1;
        component.set("v.sequenceNo",New);
        
    },
    
        showToast: function(component,event,helper){
		console.log('at show toast');
           
               //Validate and add Same Start
                // set params to add the dependency to the WO 
                var idchild = component.get("v.idchld");
                var parentId = component.get("v.RecordIdChild");
                var action = component.get("c.saveSameStart");                
                            action.setParams({
                                'idWOLI' : idchild ,
                                'parentId' : parentId,
                                
                            });
                // set call back 
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                          console.log('dependecy added');
                    } 
                    else if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                            }
                        } 
                    }
                });
                // enqueue the server side action  
                $A.enqueueAction(action);
            
         $A.get('e.force:refreshView').fire();
        },
               
        
})