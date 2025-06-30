    
    function isValidID(input){
      const id = parseInt(input, 10); // convierte el input a int base 10
      return !isNaN(id) && id > 0; //Es un número y es positivo
    };

    function isValidString(input){
      return typeof input === 'string' && input.trim() !== '' && input.trim().length  <=255; 
    }

module.exports = {
    isValidID,
    isValidString 
};