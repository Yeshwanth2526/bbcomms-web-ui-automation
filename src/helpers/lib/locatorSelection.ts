import { Selector } from 'webdriverio';

class LocatorSelection {
 
    
    static async xpathSelection(name: Selector) {

        const name1 = name.toString;
        
        //const name2 = name1.split
        switch(name) { 
            case name='xpath':
               //statements; 
               break; 
            
            case name='id':
                //statements; 
                break; 
             
            default: { 
               //statements; 
               break; 
            } 
         }
    }

 
    
}

export default LocatorSelection;
