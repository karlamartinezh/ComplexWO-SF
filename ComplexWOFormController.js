({
        
    init: function(cmp, event, helper) {
        
        var fieldSetName = cmp.get('v.fieldSetName');
        var sobjectName = cmp.get('v.sObjectName');
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
        
        getFormAction.setCallback(this, function(response) {
            var state = response.getState();
            console.log("callback state: " + state);
            
            if (cmp.isValid() && state === "SUCCESS") {
                var form = response.getReturnValue();
                cmp.set('v.fields', form.Fields);
                var fld=cmp.get("v.fields");
              
            }
        }
                                 );
        $A.enqueueAction(getFormAction);
    },
    
    handleSubmit : function(component, event, helper) {
    
        event.preventDefault();
            var fields= event.getSource();
            var fld=fields.get("v.value");
            component.find("test").submit(fld);
       
       },
    
    handleSuccess : function(component, event, helper) {
        var payload = event.getParams().response;
        var parID= payload.id;

        component.set("v.ParentRecordId",parID);
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({"title": "Success!",
                              "mode": 'sticky',
                              "message": "The Complex Work Order has been saved.",
                              "type": "Success",
                              "messageTemplate": 'Record {0} created! See it {1}!',
                                      "messageTemplateData": ['Salesforce', {
                                      url: 'https://mydefaultdomain-dev-ed.lightning.force.com/lightning/r/WorkOrder/'+parID+'/view',
                                          label: 'Complex work Order',
                                      }]   });
        toastEvent.fire();
        var empty = component.get("v.WOLIDetailsList.length");
        console.log(empty);
      
        if(empty == 0){
            $A.get('e.force:refreshView').fire();
        }
  },
    
    handleCancel : function(component, event, helper) {
        
        event.preventDefault();
        helper.cancel(component,event);
    },
    
    
    addDetails: function(component,event,helper){
        
        var CurrentWOLIdetailsList = component.get("v.WOLIDetailsList");
        var currentSize= parseInt(CurrentWOLIdetailsList.length);
        var NewSize= parseInt((currentSize)+1);
        CurrentWOLIdetailsList.push(NewSize);
        component.set("v.WOLIDetailsList", CurrentWOLIdetailsList);
        
    },
    
  
    
    
})