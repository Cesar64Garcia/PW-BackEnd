# PW-BackEnd
Proyecto de backend para programacion web

<br />
Dependencias:<br />
-Contenedor con base de datos de mongo. Se recomienda que este en un cluster aislado. <br />
-Contenedor con redis. Se recomienda que este en el mismo cluster que la REST API. <br />
<br />
Instlación:<br />
-Utilzar docker build para ejecutar los comanods del Dockerfile: ej: docker run -it --rm -p 3333:3333 --name express --link=redis:redis-host --host=mongo-host:192.168.1.1 express<br />