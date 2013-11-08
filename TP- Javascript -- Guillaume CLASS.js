function EventEmitter(){    // HashMap [ event -> [fn1, fn2, ...] ]
 this.callbacks = {}; 
}
EventEmitter.prototype = {
    
  on: function(event, fn){ 
    if(!this.callbacks.hasOwnProperty(event)){     //si cet événement n'a pas de propriété
      this.callbacks[event] = [];      //alors on le créer
    }
    this.callbacks[event].push(fn);        //On donne la fonction de cet événement
    return this;
  },
  
  off: function(event, fn){
    if (event && fn){              // Si l'on a un event et une fonction de déclarer on ne supprime que la fonction
      console.log("On supprime la fonction !");
      var fnction = this.callbacks[event].indexOf(fn);
      this.callbacks[event].splice(fnction, 1);      
    }
    else if(event && !fn) {        // Si l'on a juste l'event de déclarer on supprime toutes ses fonctions
      console.log("On supprime toutes les fonctions");
      delete this.callbacks[event];   
    }
    else {                         // On supprime tout !!!
      console.log("On supprime tout !");
      this.callbacks = {};
    }
    return this;
  }, 
  
  emit: function(event /*, args */){
    var args = Array.prototype.slice.call(arguments);    //Récupérer tous les args sauf "event" dans le tableau
    args.shift();                                        //Supprimer le premier élément du tableau
    if(this.callbacks.hasOwnProperty(event)){             //si "event" est présent dans this.callbacks
      this.callbacks[event].forEach(function(f){          //On ouvre le tableau correspondant à l'événement
        f.apply(this, args);                              //pour chaque fonction j'applique les différents arguments (en fonction de la quantité)
      });
    }
    return this;
  },
    
  once: function(event, fn){       // on ne fait fonctionner rien qu'une fois la fonction 
    var count = 1;
    var This2 = this;             // Un nouveau this qui dépend de ce qui précède 
    var fonct1 = function(){
      --count;
      if(count === 0){         
        This2.off();      
      }
    };
    This2.on(event, fn);
    this.callbacks[event].push(fonct1);
    return this;
  },
  
  times: function(event, combien, fn){       // Même principe que le Once sauf que l'on décide combien de fois la fonction marche
    var count = 0;
    var This2 = this;             // Un nouveau this qui dépend de ce qui précède
    var Fonctplusieur = function(){
      count++;
      if(count == combien){
        This2.off();
      }
    };
    This2.on(event, fn);
    this.callbacks[event].push(Fonctplusieur);
    return this;
  },
  
  makeEventEmitter: function(){
    var eventEmitter = new EventEmitter();  
    return eventEmitter;
  },
},



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
function hello(args){console.log(args);}
function bye(){console.log.bind(console);}


var julien = new EventEmitter();


console.log("1- Implémenter le 'Chaining'");
julien.on("event1", console.log("le chaining marche ")).on("event1", console.log(", encore")).on("event2", console.log(", et encore !"));
console.log();

console.log("2- Un off qui supprime tout");
julien.on("event1", bye).on("event1", function(args){console.log(args)}).off();
julien;   // supprimer tout ce qui suit pour voir un tableau vide
console.log();