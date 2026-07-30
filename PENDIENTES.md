Sí, en los dos hay bastante. Te lo separo en qué es motor y qué es del feature.

horarios-laborales-formulario.ts (420 líneas)

Debería estar en shared — es el mismo motor con otros nombres:

┌────────────────────────────────────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           Método                           │                                           Equivalente en shared                                            │
├────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ toFieldConfig() (217-239)                                  │ toCampo()                                                                                                  │
├────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ resolveControlType() (241-247)                             │ resolverControlType()                                                                                      │
├────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ generateControls() (257-265)                               │ generarControles()                                                                                         │
├────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ applyDependencyLogic() + updateDependentFields() (267-284) │ aplicarDependencias() + sincronizarCampo()                                                                 │
├────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ visibleFields (286), esCampoInvalido (288)                 │ ya están en DynamicFormGroupComponent                                                                      │
├────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Armado de valorSolicitud (350-365 y 384-399)               │ toValorDinamico() — y ojo: está duplicado dentro del mismo archivo, en guardar() y en actualizarRegistro() │
├────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ patchForm() (293-301)                                      │ candidato a patchDesdeRecord()                                                                             │
└────────────────────────────────────────────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

Es del feature, se queda: FIELD_SPAN/getFieldSpanClass, getMinDate/getMaxDate (10 días hábiles), getInputMin/getInputMax, los tres validadores (weekdayValidator, retornoAfterSalidaValidator, timeRangeValidator) con applyBusinessRules, y todo el guardado con ejercicio/periodo/SolicitudPayload.

Lo que sí faltaría en shared es el hook para engancharlos: hoy el motor no ofrece dónde meter validadores extra por campo.

orden-trabajo-in-situ-formulario.ts (712 líneas)

Lo mismo, con el sufijo Operativo: toFieldConfigOperativo, resolveControlTypeOperativo, generateOperativoControls, buildOperativoValidators, applyOperativoDependencyLogic,
updateOperativoDependentFields.

Y tiene una pieza que hoy no existe en shared y hace falta: precargarValoresOpnvertir ValorSolicitud[] del backend de vuelta a patchValue, con la regla "sivalor_catalogo ≠ 0 usa el catálogo, si no texto/número/fecha". Es el inverso de toValorDinamico y todo módulo que edite lo necesita. Sería un fromValoresSolicitud() en el motor.

El obstáculo real

No es cambiar imports. Estos dos usan FieldConfig (con section, employeeList, ns, maxLength) y el shared usa DynamicField (con opciones, unidad). Son dosmodelos de presentación distintos de la misma Pregunta.

Dos caminos:

- A) Unificar en un solo tipo — más limpio, pero toca los 3 features y sus templates.
- B) Hacer el motor genérico sobre una interfaz mínima { id, key, required, hisOn }, que ambos modelos ya cumplen. generarControles<T extends CampoBase>().Mucho menos invasivo y ambos modelos conviven.

Yo iría por B.



En horarios-laborales, updateDependentFields() (272-284) nunca recalcula validadores. generateControls() solo pone Validators.required si field.required && !field.hidden, así que un campo dependiente que llega oculto desde la API y es obligatorio nunca adquieruestra: se puede guardar vacío.

orden-trabajo-in-situ sí lo hace bien (control.setValidators(...) en la línea 269 de su bloque) y el motor de shared también. Es decir, migrar horarios-laborales arreglaría ese hueco de paso.

No toqué nada, como pediste. Si quieres avanzar, el orden con menos riesgo sería: primero el genérico del motor (opción B), luego por-contraloria (337 líneas, el más chico y casi
gemelo de horarios), y con eso validado seguir con los otros dos.


Comparación de src/app/features/solicitud-trabajo (1027 líneas en el padre).

Lo que es motor y debería estar en shared

┌─────────────────────────────────────┬─────────────────────────────────┐
│       En solicitud-trabajo.ts       │           Equivalente           │
├─────────────────────────────────────┼─────────────────────────────────┤
│ toFieldConfig() (971-1000)          │ toCampo()                       │
├─────────────────────────────────────┼─────────────────────────────────┤
│ resolveControlType() (1002-1008)    │ resolverControlType()           │
├─────────────────────────────────────┼─────────────────────────────────┤
│ generateControls() (906-917)        │ generarControles()              │
├─────────────────────────────────────┼─────────────────────────────────┤
│ buildValidators() (919-928)         │ validadores()                   │
├─────────────────────────────────────┼─────────────────────────────────┤
│ applyDependencyLogic() (930-935)    │ aplicarDependencias()           │
├─────────────────────────────────────┼─────────────────────────────────┤
│ updateDependentFields() (937-955)   │ núcleo de aplicarDependencias() │
├─────────────────────────────────────┼─────────────────────────────────┤
│ syncFieldState() (957-969)          │ sincronizarCampo()              │
├─────────────────────────────────────┼─────────────────────────────────┤
│ getFieldControl() (875-877)         │ ya está en el componente shared │
├─────────────────────────────────────┼─────────────────────────────────┤
│ guardarValoresSolicitud() (414-434) │ toValorDinamico()               │
├─────────────────────────────────────┼─────────────────────────────────┤
│ preCargarValoresEdicion() (229-267) │ no existe en shared todavía     │
└─────────────────────────────────────┴─────────────────────────────────┘
                                                                                                                                                                                        Dato relevante: syncFieldState() es la implementación más completa de las cuatal ocultar/mostrar y además no resetea los coordinates ni los schedule alocultarlos. Si algún día se unifica, esta es la que hay que tomar como base, no la de plan-muestreo.                                                                                   
Y preCargarValoresEdicion() tiene un detalle que no está en ningún otro lado: aplica el patchValue en dos fases — primero los selects, para que se dispare updateDependentFields() y se habiliten los dependientes, y después los textos sobre controles ya habilitadoto genérico ganado a golpes; orden-trabajo-in-situ hace un solo patchValue yes candidato al mismo problema.

Lo que es del feature y se queda

resolveSection() (1010-1020, mapea nombres de campo a secciones de UI), isMotiPasaporteSelected, el bloque de pasaporte dentro de updateDependentFields(945-953), el manejo de manualSchedules con valor_multiple como JSON, buscarDatosIntegracion (SRI/Civil/IESS), y todo el asistente (currentStep, goToStep, Leaflet).

Caso intermedio: rucEcuatoriano() / cedulaEcuatoriana() son validadores perfectamente reutilizables, pero se asignan por substring de la clave (key.includes('ruc')), que es una regla
del feature. El motor tendría que exponer un hook tipo validadoresExtra(campo)

Las cuatro variantes divergentes

Esto es lo que más me llama la atención: el mismo método está implementado 4 v

┌────────────────────────────────────────────────┬───────────────────┬───────────────┬──────────┬─────────────────┬────────┐
│                                                │ solicitud-trabajo │ orden-intraloria │ shared │
├────────────────────────────────────────────────┼───────────────────┼───────────────┼──────────┼─────────────────┼────────┤
│ Recalcula validadores al mostrar/ocultar       │        ✅         │      ✅       │    ❌    │       ❌        │   ✅   │
├────────────────────────────────────────────────┼───────────────────┼───────────────┼──────────┼─────────────────┼────────┤
│ Excepciones al resetear (coordinates/schedule) │        ✅         │      ❌       │    ❌    │       ❌        │  n/a   │                                                    ├────────────────────────────────────────────────┼───────────────────┼──────────────────┼────────┤
│ Soporta maxLength                              │        ✅         │      ✅       │    ✅    │       ✅        │   ❌   │                                                    ├────────────────────────────────────────────────┼───────────────────┼──────────────────┼────────┤
│ Valor inicial por tipo de control              │      ❌ ('')      │    ❌ ('')    │ ❌ ('')  │     ❌ ('')     │   ✅   │                                                    ├────────────────────────────────────────────────┼───────────────────┼──────────────────┼────────┤
│ Precarga desde ValorSolicitud                  │   ✅ (2 fases)    │  ✅ (1 fase)  │    ❌    │       ❌        │   ❌   │                                                    └────────────────────────────────────────────────┴───────────────────┴──────────────────┴────────┘

Se lee así: horarios-laborales y por-contraloria comparten el hueco que te mencioné — un campo dependiente que llega oculto y obligatorio nunca adquiere Validators.required al mostrarse, así que se puede guardar vacío.

Y en la otra dirección: el motor de shared no soporta maxLength, que los cuatro sí usan. Si se migra alguno tal cual hoy, se perdería esa validación. Es un requisito para el trabajo de unificación.

Sobre el orden de migración

Esto me cambia la recomendación que te di antes. solicitud-trabajo no debería ser el último por ser el más grande: es el que tiene la implementación de referencia (syncFieldState y la
precarga en dos fases). Lo sensato es extraer de ahí el comportamiento correctmaxLength y un fromValoresSolicitud()), y recién entonces migrar los tresrestantes contra ese motor ya completo — que de paso les arregla los huecos.

Sigo sin tocar nada.
