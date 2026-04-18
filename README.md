# Cypress (Pruebas en e-commerse tanto de API con UI)

Smoke-test: Se crea un usuario usando datos estaticos(JSON) y datos aleatorios (biblioteca @faker) con el fin de tener un usuario nuevo cada vez que se quiera probar una creacion de un usuario en la plataforma, testear el camino de buscar un producto, lo agrega al carrito , se observa que se cree el carrito correctamente , luego se proceda a entrar con el usuario y contraseña del Usuario creado, se usa datos estaticos (JSON) para pagar con tarjeta de credito siguiendo el formato correcto. El siguiente test despues nos fijamos que los datos del usuario creado coincide con los datos del perfil del ususario para ver si hay cambios en los datos. 

SingIn -> Busqueda de producto -> Agregar producto al carrito -> Ingresar a la cuenta -> Pagar compra -> Revisar que los datos del perfil coincidan con los datos usados en el registro. 

Product-list:  Se obtiene por api la lista de productos que se envia a la UI , se revisa que el primer producto de que mando la api coincide con el primer producto de la UI 

Accesibilidad : Se realiza pruebas sobre el Home y Sobre el formulario de contacto para ver si cumple con las normas de accesibilidad basica. 
Luego se realiza pruebas para ver si se puede acceder mediante el uso del teclado.  
Luego se valida que se observe un efecto visual para ver que marca el tab cuando se usa el teclado. 





