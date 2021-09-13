### **Código**

#### **1**

- Se codea todo en inglés. Todo lo que esté en el código es en inglés. Lo único que va en español son los textos que renderiza el cliente. Verificar la ortografía si no están seguros. Las oraciones terminan en ".", los títulos/subtitulos no.

#### **2a**

- Las variables que se definan durante todo el proyecto van en camel case.

#### **2b**

- Las tablas o nombre de los modelos van en Upper Camel Case.

#### **2c**

- Las clases (o funciones de clases) van en Upper Camel Case.

#### **3**

- Las carpetas que contienen componentes van en UpperCamelCase. Los arvhicos de los componentes son clases, por lo tanto se escriben con cada primera letra como mayúscula, UpperCamelCase.

#### **4**

- Cuando se trabaja con React, los archivos de cada componente son JSX.

#### **5a**

- Se codea con la consola abierta y los errores de la consola SE ARREGLAN (por más que el componente esté funcionando, no se termina el trabajo hasta que la consola no tenga ni un sólo error).

#### **5b**

- Cuando se termina un componente, todos los console.log se borran. No se puede mergear un componente si tiene console.log. La consola se tiene que mantener limpia en todo momento.

#### **5c**

- La consola tampoco puede tener advertencias en amarillo. Si una importación no se usa, se borra. Si useEffect tira advertencia, se arreglan las dependencias. LA CONSOLA SIEMPRE LIMPIA.

#### **6**

- Si se termina un componente y se le encuentran bugs, no se empieza otra task hasta no terminar de arreglar todos los bugs y dejar el componente 100% funcional y sin fallas.

#### **7**

- El código comentado se borra antes de mergear o pushear, no tiene que estar. Los únicos comentarios que pueden quedarse son aquellos que sirven para explicar el código a quien esté leyendolo. Estos comentarios también tienen que estar escritos en inglés y ser concisos.

#### **8**

- No se pasa más de un día (dos como muchísimo) entero sin avanzar. Se consulta en el grupo y se pide ayuda. Si no se avanza se agarra otra task.

#### **9**

- Los estilos se codean utilizando la función `makeStyles` de material-ui (o librería a convenir), no se puede usar CSS. Consultar en caso extremadamente particular.

### **Redux**

#### **10**

- Las constantes van todas en mayúsculas y se separa cada palabra con un guión bajo. ES LA ÚNICA VARIABLE QUE VA A SER SEPARADA POR UN " \_ ".

#### **11**

- Nada de if en el reducer, sólo switch.

#### **12**

- Las constates van en cada reducer.

#### **13**

- Las carpetas van en camelCase, y los reducer y actions se ponen de la siguiente manera: en el caso de un login, sería `actionLogin.js`, y `reducerLogin.js`.

#### **14**

- Todas las actions a las que se haga dispatch tienen que tener la forma de "{type: `CONSTANT`, payload: `OBJECT`}"

### **Estilos**

#### **15**

- Cada componente tendrá en su carpeta tendrá el archivo `styles.js` adentro donde se definiran todos los MakeStyles. No puede haber `makeStyles` en un componente.

#### **16**

- Las importaciones todas en una misma linea, dentro de llaves separadas con coma. Hay que tratar de reducir al mínimo la cantida de imports.

### **Github**

#### **17**

- NO SE COMMITEA `package.log.json`.

#### **18**

- Se arranca a trabajar, se termina y se hace el pull request lo más rápido que se puede. Hay que evitar los merge de devs muy desactualizadas.

#### **19**

- Todos los commits son en inglés y con lenguaje semi formal. Se commitea cada vez que se termina una task. Se especifica en la descripción cada uno de los cambios a commitear.

#### **20**

- Todas las branches salen únicamente de dev.

#### **21**

- SE TERMINA LA BRANCH Y SE BORRA.
