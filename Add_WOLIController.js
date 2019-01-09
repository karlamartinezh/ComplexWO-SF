({
    doinit: function(cmp, event, helper){
        var fieldSetName = cmp.get('v.fieldSetName2');
        var sobjectName = cmp.get('v.sObjectName2');
        var recordId = cmp.get('v.recordId');
        
        if (!fieldSetName) {
            console.log('The field set is required.');
            return;
        }        
        var getFormAction = cmp.get('c.getForm');
            getFormAction.setParams({
                fieldSetName: fieldSetName,
                objectName: sobjectName,
                recordId: recordId
            });
            
        getFormAction.setCallback(this, function(response){
            var state = response.getState();
            console.log("callback state: " + state);
            
            if (cmp.isValid() && state === "SUCCESS") {
                var form = response.getReturnValue();
                cmp.set('v.fields2', form.Fields);
            }
        });
        $A.enqueueAction(getFormAction);
        helper.helperRectifySequence(cmp,event);
        
    },
    
    changeInIndexNo: function(component, event, helper){
        helper.helperRectifySequence(component,event);
    },
    
    deleteDetails : function(component, event, helper) {
        
        var NewWOLIdetails= component.get("v.WOLIDetailsInnerComponent");
        var currentIndex= component.get("v.indexNo");
        if(currentIndex > -1)
            NewWOLIdetails.splice(currentIndex,1);
        component.set("v.WOLIDetailsInnerComponent", NewWOLIdetails);
    },
    
    handleSubmit: function(component, event, helper){
        
        var RecordIdChild = component.get("v.RecordIdChild");
        	component.set("v.idfield",RecordIdChild);
        
        var fields2= event.getSource().getElement().value;
        	component.find("record2").submit(fields2);
    },
        
        
    handleSuccess: function(component,event,helper){
        
        var payload = event.getParams().response;
        var chldID= payload.id;
        
        component.set("v.idchld",chldID);
        helper.showToast(component,event,helper);
        
      
        },

    
})