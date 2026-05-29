import {
  PdfViewerComponent
} from "./chunk-IW3ZRNLW.js";
import {
  PeriodoService
} from "./chunk-YDUHZXBQ.js";
import {
  LoadingComponent
} from "./chunk-VPP6RQL4.js";
import {
  ToastrAlertService
} from "./chunk-ECH5TBPN.js";
import "./chunk-PWNMWNUA.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-J76B35JM.js";
import {
  DomSanitizer
} from "./chunk-XTPUTV4O.js";
import {
  AppRole,
  MenuKey,
  hasPermission
} from "./chunk-O4XHAB45.js";
import {
  SolicitudService
} from "./chunk-WQQ4FWBU.js";
import {
  ReportSolicitudService
} from "./chunk-IW66RJTG.js";
import {
  require_sweetalert2_all
} from "./chunk-TTWGDTQR.js";
import {
  PaginationComponent
} from "./chunk-5SMDVGDD.js";
import "./chunk-XIRXEHG5.js";
import {
  PageHeader
} from "./chunk-2W4SUA4N.js";
import "./chunk-7OA5XFJQ.js";
import {
  AuthService,
  CommonModule,
  NgClass
} from "./chunk-FYBL3SR2.js";
import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  Output,
  Subject,
  ViewChild,
  __spreadProps,
  __spreadValues,
  __toESM,
  computed,
  finalize,
  firstValueFrom,
  forkJoin,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-4XEQTJJK.js";

// src/app/features/por-contraloria/formulario/por-contraloria-formulario.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.empleado_id;
function PorContraloriaFormulario_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 12);
    \u0275\u0275element(2, "path", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Editando registro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 14);
    \u0275\u0275listener("click", function PorContraloriaFormulario_Conditional_0_Conditional_2_Conditional_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.cancelarEdicion());
    });
    \u0275\u0275text(6, " Cancelar edici\xF3n ");
    \u0275\u0275elementEnd()();
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1, " *");
    \u0275\u0275elementEnd();
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Conditional_4_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const emp_r4 = ctx.$implicit;
    \u0275\u0275property("value", emp_r4.empleado_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(emp_r4.nombre_empleado);
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "select", 20)(1, "option", 21);
    \u0275\u0275text(2, "Seleccione un funcionario...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Conditional_4_For_4_Template, 2, 2, "option", 22, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("border-red-500", ctx_r2.esCampoInvalido(field_r5.key));
    \u0275\u0275property("formControlName", field_r5.key);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(field_r5.employeeList);
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Conditional_5_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r6 = ctx.$implicit;
    \u0275\u0275property("value", opt_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r6.nombre);
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "select", 20)(1, "option", 21);
    \u0275\u0275text(2, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Conditional_5_For_4_Template, 2, 2, "option", 22, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("border-red-500", ctx_r2.esCampoInvalido(field_r5.key));
    \u0275\u0275property("formControlName", field_r5.key);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(field_r5.options);
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "input", 23);
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("border-red-500", ctx_r2.esCampoInvalido(field_r5.key));
    \u0275\u0275property("formControlName", field_r5.key)("type", ctx_r2.getInputType(field_r5))("placeholder", field_r5.placeholder);
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getFieldError(field_r5.key));
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "label", 15);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Conditional_3_Template, 2, 0, "span", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Conditional_4_Template, 5, 3, "select", 17)(5, PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Conditional_5_Template, 5, 3, "select", 17)(6, PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Conditional_6_Template, 1, 5, "input", 18);
    \u0275\u0275conditionalCreate(7, PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Conditional_7_Template, 2, 1, "span", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r2.getFieldSpanClass(field_r5.key));
    \u0275\u0275advance();
    \u0275\u0275classProp("text-red-600", ctx_r2.esCampoInvalido(field_r5.key));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", field_r5.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r5.required ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r5.controlType === "employee-list" ? 4 : field_r5.controlType === "select" ? 5 : 6);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.getFieldError(field_r5.key) ? 7 : -1);
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_For_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1, " *");
    \u0275\u0275elementEnd();
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_For_9_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getFieldError(field_r7.key));
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "label", 15);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, PorContraloriaFormulario_Conditional_0_Conditional_2_For_9_Conditional_3_Template, 2, 0, "span", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "textarea", 24);
    \u0275\u0275conditionalCreate(5, PorContraloriaFormulario_Conditional_0_Conditional_2_For_9_Conditional_5_Template, 2, 1, "span", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-red-600", ctx_r2.esCampoInvalido(field_r7.key));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", field_r7.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r7.required ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("border-red-500", ctx_r2.esCampoInvalido(field_r7.key));
    \u0275\u0275property("formControlName", field_r7.key)("placeholder", field_r7.placeholder)("maxlength", field_r7.maxLength ?? 9999);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.getFieldError(field_r7.key) ? 5 : -1);
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 25);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.editingRecord ? "Actualizando..." : "Guardando...", " ");
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.editingRecord ? "ACTUALIZAR ORDEN" : "GUARDAR ORDEN", " ");
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function PorContraloriaFormulario_Conditional_0_Conditional_2_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.cancelarEdicion());
    });
    \u0275\u0275text(1, " Cancelar ");
    \u0275\u0275elementEnd();
  }
}
function PorContraloriaFormulario_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, PorContraloriaFormulario_Conditional_0_Conditional_2_Conditional_0_Template, 7, 0, "div", 2);
    \u0275\u0275elementStart(1, "form", 3);
    \u0275\u0275listener("ngSubmit", function PorContraloriaFormulario_Conditional_0_Conditional_2_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.guardar());
    });
    \u0275\u0275elementStart(2, "div", 4)(3, "h3", 5);
    \u0275\u0275text(4, "Orden de movilizaci\xF3n de veh\xEDculo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 6);
    \u0275\u0275repeaterCreate(6, PorContraloriaFormulario_Conditional_0_Conditional_2_For_7_Template, 8, 7, "div", 7, _forTrack0);
    \u0275\u0275repeaterCreate(8, PorContraloriaFormulario_Conditional_0_Conditional_2_For_9_Template, 6, 10, "div", 8, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 9)(11, "button", 10);
    \u0275\u0275conditionalCreate(12, PorContraloriaFormulario_Conditional_0_Conditional_2_Conditional_12_Template, 2, 1)(13, PorContraloriaFormulario_Conditional_0_Conditional_2_Conditional_13_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, PorContraloriaFormulario_Conditional_0_Conditional_2_Conditional_14_Template, 2, 0, "button", 11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r2.editingRecord ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r2.form);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.regularFields);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.textareaFields);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("bg-amber-500", ctx_r2.editingRecord)("hover:bg-amber-600", ctx_r2.editingRecord)("bg-[#1e3a8a]", !ctx_r2.editingRecord)("hover:bg-[#2541b2]", !ctx_r2.editingRecord);
    \u0275\u0275property("disabled", ctx_r2.saving);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.saving ? 12 : 13);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.editingRecord ? 14 : -1);
  }
}
function PorContraloriaFormulario_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275conditionalCreate(1, PorContraloriaFormulario_Conditional_0_Conditional_1_Template, 1, 0, "app-loading")(2, PorContraloriaFormulario_Conditional_0_Conditional_2_Template, 15, 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("border-amber-400", ctx_r2.editingRecord);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.loading ? 1 : 2);
  }
}
var PorContraloriaFormulario = class _PorContraloriaFormulario {
  fb;
  solicitudService;
  authService;
  periodoService;
  zone;
  toastrAlert;
  editingRecord = null;
  guardado = new EventEmitter();
  cancelado = new EventEmitter();
  formularioReady = new EventEmitter();
  form;
  formulario = null;
  fields = [];
  loading = true;
  saving = false;
  userAppRole = computed(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return Object.values(AppRole).find((r) => roles.includes(r)) ?? null;
  }, ...ngDevMode ? [{ debugName: "userAppRole" }] : []);
  canCreate = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.POR_CONTRALORIA, role, "crear") : false;
  }, ...ngDevMode ? [{ debugName: "canCreate" }] : []);
  FIELD_SPAN = {
    val_funcionario_id: 2,
    val_motivo_movilizacion: 2
  };
  getFieldSpanClass(key) {
    return (this.FIELD_SPAN[key] ?? 1) === 2 ? "sm:col-span-2 md:col-span-2" : "";
  }
  getFieldError(key) {
    const ctrl = this.form.get(key);
    if (!ctrl || !ctrl.invalid || !ctrl.touched && !ctrl.dirty)
      return null;
    if (ctrl.errors?.["required"])
      return "Este campo es requerido.";
    return null;
  }
  getInputType(field) {
    if (field.key === "val_hora_salida" || field.key === "val_hora_retorno")
      return "time";
    const tipo = field.source.tipo_respuesta;
    if (tipo === "Fecha")
      return "date";
    if (tipo === "Numerico")
      return "number";
    return "text";
  }
  get visibleFields() {
    return this.fields.filter((f) => !f.hidden);
  }
  get regularFields() {
    return this.visibleFields.filter((f) => f.controlType !== "textarea");
  }
  get textareaFields() {
    return this.visibleFields.filter((f) => f.controlType === "textarea");
  }
  esCampoInvalido(key) {
    const c = this.form.get(key);
    return !!c && c.invalid && (c.touched || c.dirty);
  }
  destroy$ = new Subject();
  constructor(fb, solicitudService, authService, periodoService, zone, toastrAlert) {
    this.fb = fb;
    this.solicitudService = solicitudService;
    this.authService = authService;
    this.periodoService = periodoService;
    this.zone = zone;
    this.toastrAlert = toastrAlert;
    this.form = this.fb.group({});
  }
  ngOnInit() {
    this.cargarFormularioDinamico();
  }
  ngOnChanges(changes) {
    if (changes["editingRecord"] && !this.loading) {
      const record = changes["editingRecord"].currentValue;
      if (record) {
        this.patchForm(record);
      } else {
        this.form.reset();
      }
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  cargarFormularioDinamico() {
    const { id } = this.authService.currentUser();
    this.solicitudService.getFormulario("1003", id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (formulario) => {
        this.zone.run(() => {
          this.formulario = formulario;
          this.fields = formulario.preguntas.filter((p) => p.estado !== false).map((p) => this.toFieldConfig(p)).sort((a, b) => a.order - b.order);
          this.generateControls();
          this.applyDependencyLogic();
          this.loading = false;
          this.formularioReady.emit({
            nombre: formulario.formulario_nombre,
            fields: this.fields,
            formularioId: formulario.formulario_id
          });
          if (this.editingRecord) {
            this.patchForm(this.editingRecord);
          }
        });
      },
      error: () => {
        this.zone.run(() => {
          this.loading = false;
          this.toastrAlert.showError("No se pudo cargar el formulario", "Error");
        });
      }
    });
  }
  toFieldConfig(pregunta) {
    return {
      id: pregunta.id,
      key: pregunta.nombre,
      label: pregunta.pregunta,
      order: pregunta.orden,
      controlType: this.resolveControlType(pregunta),
      section: "operador",
      placeholder: typeof pregunta.ayuda === "string" ? pregunta.ayuda : "",
      required: pregunta.obligatorio,
      readonly: pregunta.readonly,
      hidden: pregunta.hidden,
      maxLength: typeof pregunta.num_caracter === "number" ? pregunta.num_caracter : null,
      options: pregunta.catalogos ?? [],
      employeeList: pregunta.listado_empleado ?? [],
      scheduleItems: pregunta.jornada_laboral_item ?? [],
      dependsOn: pregunta.atributo_id ? { fieldId: String(pregunta.atributo_id), triggerValue: String(pregunta.item_catalogo_id ?? "") } : void 0,
      integrations: { sri: pregunta.is_ws_sri, civil: pregunta.is_ws_civil, iess: pregunta.is_ws_iess ?? false },
      source: pregunta
    };
  }
  resolveControlType(pregunta) {
    if (pregunta.is_list_empleado)
      return "employee-list";
    if (pregunta.tipo_respuesta === "Selecci\xF3n Simple")
      return "select";
    if (pregunta.is_text_area)
      return "textarea";
    return "text";
  }
  generateControls() {
    for (const field of this.fields) {
      if (this.form.contains(field.key))
        continue;
      const validators = [];
      if (field.required && !field.hidden)
        validators.push(Validators.required);
      if (field.maxLength)
        validators.push(Validators.maxLength(field.maxLength));
      this.form.addControl(field.key, this.fb.control({ value: "", disabled: field.hidden }, validators));
    }
  }
  applyDependencyLogic() {
    this.updateDependentFields();
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateDependentFields());
  }
  updateDependentFields() {
    for (const field of this.fields) {
      if (!field.dependsOn)
        continue;
      const parentField = this.fields.find((c) => c.id === field.dependsOn?.fieldId);
      const parentValue = parentField ? this.form.get(parentField.key)?.value : null;
      const hide = String(parentValue ?? "") !== field.dependsOn.triggerValue;
      field.hidden = hide;
      const control = this.form.get(field.key);
      if (!control)
        continue;
      if (hide) {
        control.disable({ emitEvent: false });
        control.reset("", { emitEvent: false });
      } else {
        control.enable({ emitEvent: false });
      }
    }
  }
  patchForm(record) {
    const patch = {};
    for (const field of this.fields) {
      const val = record[field.key];
      if (val !== void 0 && val !== "\u2014")
        patch[field.key] = val;
    }
    this.form.patchValue(patch);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  cancelarEdicion() {
    this.form.reset();
    this.cancelado.emit();
  }
  async guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastrAlert.showWarning("Por favor, llene todos los campos requeridos para continuar.", "Formulario Incompleto");
      return;
    }
    this.saving = true;
    const raw = this.form.getRawValue();
    if (this.editingRecord) {
      await this.actualizarRegistro(raw);
      return;
    }
    const now = /* @__PURE__ */ new Date();
    try {
      const ejercicio = await this.periodoService.getEjercicioByAnio(now.getFullYear());
      if (!ejercicio)
        throw new Error(`No hay ejercicio activo para el a\xF1o ${now.getFullYear()}`);
      const periodo = await this.periodoService.getPeriodoByEjercicioAndMes(ejercicio.id, now.getMonth() + 1);
      if (!periodo)
        throw new Error(`No hay periodo activo para el mes ${now.getMonth() + 1}`);
      const { id: userId } = this.authService.currentUser();
      const solicitudPayload = {
        formulario_id: this.formulario?.formulario_id ?? null,
        usuario_id: userId,
        entidad_id: "F9687983-F6CF-4706-9004-A1B793E3A987",
        secuencial_id: null,
        ctestado_id: 388,
        periodo_id: periodo.id,
        descripcion: "",
        ejercicio_id: ejercicio.id,
        tecnico_id: raw.tecnico_id
      };
      const res = await firstValueFrom(this.solicitudService.registrarSolicitud(solicitudPayload));
      const solicitudId = res?.data?.id ?? res?.id ?? null;
      const valorSolicitud = this.fields.filter((f) => !f.hidden).map((f) => {
        const value = raw[f.key];
        const esSelect = f.controlType === "select";
        const esEmployee = f.controlType === "employee-list";
        return {
          solicitud_id: solicitudId,
          atributo_formulario_id: String(f.id),
          valor_texto: esEmployee ? value ?? "" : !esSelect && value != null && value !== "" ? String(value) : null,
          valor_numero: null,
          valor_fecha: null,
          valor_booleano: null,
          valor_multiple: null,
          valor_catalogo: esSelect ? Number(value) || 0 : 0,
          valor_uuid: esEmployee ? value ?? "" : null,
          estado: true
        };
      });
      await firstValueFrom(this.solicitudService.guardarValoresSolicitud({ valorSolicitud }));
      this.zone.run(() => {
        this.saving = false;
        this.form.reset();
        this.toastrAlert.showSuccess("El registro ha sido guardado correctamente.", "\xA1Guardado!");
        this.guardado.emit();
      });
    } catch {
      this.zone.run(() => {
        this.saving = false;
        this.toastrAlert.showError("No se pudo guardar el registro", "Error");
      });
    }
  }
  async actualizarRegistro(raw) {
    const valorSolicitud = this.fields.filter((f) => !f.hidden).map((f) => {
      const value = raw[f.key];
      const esSelect = f.controlType === "select";
      const esEmployee = f.controlType === "employee-list";
      return {
        solicitud_id: this.editingRecord.id,
        atributo_formulario_id: String(f.id),
        valor_texto: esEmployee ? value ?? "" : !esSelect && value != null && value !== "" ? String(value) : null,
        valor_numero: null,
        valor_fecha: null,
        valor_booleano: null,
        valor_multiple: null,
        valor_catalogo: esSelect ? Number(value) || 0 : 0,
        valor_uuid: esEmployee ? value ?? "" : null,
        estado: true
      };
    });
    try {
      await firstValueFrom(this.solicitudService.actualizarValoresSolicitud(this.editingRecord.id, { valorSolicitud }));
      this.zone.run(() => {
        this.saving = false;
        this.form.reset();
        this.toastrAlert.showSuccess("Registro actualizado correctamente.", "\xA1Actualizado!");
        this.guardado.emit();
      });
    } catch (err) {
      this.zone.run(() => {
        this.saving = false;
        this.toastrAlert.showError("No se pudo actualizar el registro", "Error");
      });
    }
  }
  static \u0275fac = function PorContraloriaFormulario_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PorContraloriaFormulario)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(SolicitudService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(PeriodoService), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ToastrAlertService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PorContraloriaFormulario, selectors: [["app-por-contraloria-formulario"]], inputs: { editingRecord: "editingRecord" }, outputs: { guardado: "guardado", cancelado: "cancelado", formularioReady: "formularioReady" }, features: [\u0275\u0275NgOnChangesFeature], decls: 1, vars: 1, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-8", "mb-6", 3, "border-amber-400"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-8", "mb-6"], [1, "flex", "items-center", "gap-3", "mb-6", "p-3", "bg-amber-50", "border", "border-amber-300", "rounded", "text-amber-800", "text-sm"], [3, "ngSubmit", "formGroup"], [1, "mb-6", "border-b", "border-slate-300", "pb-4"], [1, "text-lg", "font-bold", "text-[#1e3a8a]", "mb-1"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "gap-x-8", "gap-y-6"], [1, "flex", "flex-col", 3, "ngClass"], [1, "flex", "flex-col", "col-span-1", "sm:col-span-2", "md:col-span-3"], [1, "flex", "items-center", "gap-4", "pt-4", "border-t", "border-slate-300", "mt-8"], ["type", "submit", 1, "px-8", "py-2.5", "rounded", "text-sm", "font-bold", "shadow-md", "transition-all", "disabled:opacity-60", "disabled:cursor-not-allowed", "text-white", "flex", "items-center", "gap-2", 3, "disabled"], ["type", "button", 1, "bg-white", "border", "border-slate-300", "text-slate-700", "px-8", "py-2.5", "rounded", "text-sm", "font-bold", "shadow-sm", "hover:bg-slate-50", "transition-all"], ["fill", "none", "stroke", "currentColor", "stroke-width", "2", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6-2 .5.5-2z"], ["type", "button", 1, "ml-auto", "text-xs", "font-semibold", "text-amber-700", "hover:text-amber-900", "underline", "underline-offset-2", 3, "click"], [1, "block", "text-[11px]", "font-bold", "text-[#1e3a8a]", "uppercase", "mb-1"], [1, "text-red-500"], [1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "formControlName", "border-red-500"], [1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "formControlName", "type", "placeholder", "border-red-500"], [1, "text-red-500", "text-[11px]", "mt-1"], [1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "formControlName"], ["value", ""], [3, "value"], [1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "formControlName", "type", "placeholder"], ["rows", "3", 1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-3", "rounded", "text-sm", "resize-none", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "formControlName", "placeholder", "maxlength"], [1, "animate-spin", "h-4", "w-4", "border-2", "border-white", "border-t-transparent", "rounded-full"], ["type", "button", 1, "bg-white", "border", "border-slate-300", "text-slate-700", "px-8", "py-2.5", "rounded", "text-sm", "font-bold", "shadow-sm", "hover:bg-slate-50", "transition-all", 3, "click"]], template: function PorContraloriaFormulario_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, PorContraloriaFormulario_Conditional_0_Template, 3, 3, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.canCreate() || ctx.editingRecord ? 0 : -1);
    }
  }, dependencies: [CommonModule, NgClass, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, FormsModule, LoadingComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PorContraloriaFormulario, [{
    type: Component,
    args: [{ selector: "app-por-contraloria-formulario", imports: [CommonModule, ReactiveFormsModule, FormsModule, LoadingComponent], template: `@if (canCreate() || editingRecord) {
  <div
    class="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-6"
    [class.border-amber-400]="editingRecord"
  >

    @if (loading) {
      <app-loading />
    } @else {

      @if (editingRecord) {
        <div class="flex items-center gap-3 mb-6 p-3 bg-amber-50 border border-amber-300 rounded text-amber-800 text-sm">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6-2 .5.5-2z"/>
          </svg>
          <span>Editando registro</span>
          <button
            type="button"
            (click)="cancelarEdicion()"
            class="ml-auto text-xs font-semibold text-amber-700 hover:text-amber-900 underline underline-offset-2"
          >
            Cancelar edici\xF3n
          </button>
        </div>
      }

      <form [formGroup]="form" (ngSubmit)="guardar()">

        <div class="mb-6 border-b border-slate-300 pb-4">
          <h3 class="text-lg font-bold text-[#1e3a8a] mb-1">Orden de movilizaci\xF3n de veh\xEDculo</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">

          @for (field of regularFields; track field.id) {
            <div class="flex flex-col" [ngClass]="getFieldSpanClass(field.key)">
              <label
                class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1"
                [class.text-red-600]="esCampoInvalido(field.key)"
              >
                {{ field.label }}
                @if (field.required) { <span class="text-red-500"> *</span> }
              </label>

              @if (field.controlType === 'employee-list') {
                <select
                  [formControlName]="field.key"
                  class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors"
                  [class.border-red-500]="esCampoInvalido(field.key)"
                >
                  <option value="">Seleccione un funcionario...</option>
                  @for (emp of field.employeeList; track emp.empleado_id) {
                    <option [value]="emp.empleado_id">{{ emp.nombre_empleado }}</option>
                  }
                </select>
              } @else if (field.controlType === 'select') {
                <select
                  [formControlName]="field.key"
                  class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors"
                  [class.border-red-500]="esCampoInvalido(field.key)"
                >
                  <option value="">Seleccione...</option>
                  @for (opt of field.options; track opt.id) {
                    <option [value]="opt.id">{{ opt.nombre }}</option>
                  }
                </select>
              } @else {
                <input
                  [formControlName]="field.key"
                  [type]="getInputType(field)"
                  [placeholder]="field.placeholder"
                  class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors"
                  [class.border-red-500]="esCampoInvalido(field.key)"
                />
              }

              @if (getFieldError(field.key)) {
                <span class="text-red-500 text-[11px] mt-1">{{ getFieldError(field.key) }}</span>
              }
            </div>
          }

          @for (field of textareaFields; track field.id) {
            <div class="flex flex-col col-span-1 sm:col-span-2 md:col-span-3">
              <label
                class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1"
                [class.text-red-600]="esCampoInvalido(field.key)"
              >
                {{ field.label }}
                @if (field.required) { <span class="text-red-500"> *</span> }
              </label>
              <textarea
                [formControlName]="field.key"
                rows="3"
                [placeholder]="field.placeholder"
                [maxlength]="field.maxLength ?? 9999"
                class="w-full border border-slate-300 bg-white text-slate-700 p-3 rounded text-sm resize-none outline-none focus:border-[#1e3a8a] transition-colors"
                [class.border-red-500]="esCampoInvalido(field.key)"
              ></textarea>
              @if (getFieldError(field.key)) {
                <span class="text-red-500 text-[11px] mt-1">{{ getFieldError(field.key) }}</span>
              }
            </div>
          }

        </div>

        <div class="flex items-center gap-4 pt-4 border-t border-slate-300 mt-8">
          <button
            type="submit"
            [disabled]="saving"
            class="px-8 py-2.5 rounded text-sm font-bold shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed text-white flex items-center gap-2"
            [class.bg-amber-500]="editingRecord"
            [class.hover:bg-amber-600]="editingRecord"
            [class.bg-[#1e3a8a]]="!editingRecord"
            [class.hover:bg-[#2541b2]]="!editingRecord"
          >
            @if (saving) {
              <span class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              {{ editingRecord ? 'Actualizando...' : 'Guardando...' }}
            } @else {
              {{ editingRecord ? 'ACTUALIZAR ORDEN' : 'GUARDAR ORDEN' }}
            }
          </button>

          @if (editingRecord) {
            <button
              type="button"
              (click)="cancelarEdicion()"
              class="bg-white border border-slate-300 text-slate-700 px-8 py-2.5 rounded text-sm font-bold shadow-sm hover:bg-slate-50 transition-all"
            >
              Cancelar
            </button>
          }
        </div>

      </form>
    }
  </div>
}
` }]
  }], () => [{ type: FormBuilder }, { type: SolicitudService }, { type: AuthService }, { type: PeriodoService }, { type: NgZone }, { type: ToastrAlertService }], { editingRecord: [{
    type: Input
  }], guardado: [{
    type: Output
  }], cancelado: [{
    type: Output
  }], formularioReady: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PorContraloriaFormulario, { className: "PorContraloriaFormulario", filePath: "src/app/features/por-contraloria/formulario/por-contraloria-formulario.ts", lineNumber: 35 });
})();

// src/app/features/por-contraloria/lista/por-contraloria-lista.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
var _c0 = () => [1, 2, 3, 4, 5, 6, 7, 8];
var _forTrack02 = ($index, $item) => $item.groupKey;
var _forTrack12 = ($index, $item) => $item.id;
function PorContraloriaLista_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "col", 11);
  }
}
function PorContraloriaLista_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, "Observaciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "th", 19);
    \u0275\u0275text(3, "Acciones");
    \u0275\u0275elementEnd();
  }
}
function PorContraloriaLista_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 15);
    \u0275\u0275text(1, "Observaciones");
    \u0275\u0275elementEnd();
  }
}
function PorContraloriaLista_Conditional_38_For_1_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275element(1, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "td", 30)(3, "div", 31);
    \u0275\u0275element(4, "div", 32)(5, "div", 32);
    \u0275\u0275elementEnd()();
  }
}
function PorContraloriaLista_Conditional_38_For_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 29);
    \u0275\u0275element(1, "div", 27);
    \u0275\u0275elementEnd();
  }
}
function PorContraloriaLista_Conditional_38_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 20)(1, "td", 21);
    \u0275\u0275element(2, "div", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 21);
    \u0275\u0275element(4, "div", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 21);
    \u0275\u0275element(6, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 21);
    \u0275\u0275element(8, "div", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 21);
    \u0275\u0275element(10, "div", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 21);
    \u0275\u0275element(12, "div", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 21);
    \u0275\u0275element(14, "div", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 21);
    \u0275\u0275element(16, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 21);
    \u0275\u0275element(18, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(19, PorContraloriaLista_Conditional_38_For_1_Conditional_19_Template, 6, 0)(20, PorContraloriaLista_Conditional_38_For_1_Conditional_20_Template, 2, 0, "td", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(19);
    \u0275\u0275conditional(ctx_r0.hasAnyAction ? 19 : 20);
  }
}
function PorContraloriaLista_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, PorContraloriaLista_Conditional_38_For_1_Template, 21, 1, "tr", 20, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function PorContraloriaLista_Conditional_39_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 33);
    \u0275\u0275text(2, " No hay \xF3rdenes de movilizaci\xF3n registradas. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r0.hasAnyAction ? 11 : 10);
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1, "Creado");
    \u0275\u0275elementEnd();
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1, "Pendiente");
    \u0275\u0275elementEnd();
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1, "Autorizado");
    \u0275\u0275elementEnd();
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1, "Rechazado");
    \u0275\u0275elementEnd();
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sol_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(sol_r2["estado_solicitud"] ?? "\u2014");
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const sol_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.autorizarRegistro(sol_r2));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 51);
    \u0275\u0275element(2, "path", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sol_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r0.procesandoId === sol_r2.id);
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const sol_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.rechazarRegistro(sol_r2));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 51);
    \u0275\u0275element(2, "path", 54);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sol_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r0.procesandoId === sol_r2.id);
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 62);
    \u0275\u0275listener("click", function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const sol_r2 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      ctx_r0.editar.emit(sol_r2);
      return \u0275\u0275resetView(ctx_r0.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 63);
    \u0275\u0275element(2, "path", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Editar ");
    \u0275\u0275elementEnd();
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 65);
    \u0275\u0275listener("click", function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const sol_r2 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      ctx_r0.eliminarRegistro(sol_r2);
      return \u0275\u0275resetView(ctx_r0.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 63);
    \u0275\u0275element(2, "path", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Eliminar ");
    \u0275\u0275elementEnd();
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 61)(1, "button", 67);
    \u0275\u0275listener("click", function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const sol_r2 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      ctx_r0.imprimirRegistro(sol_r2);
      return \u0275\u0275resetView(ctx_r0.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 63);
    \u0275\u0275element(3, "path", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Imprimir ");
    \u0275\u0275elementEnd()();
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275conditionalCreate(1, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_1_Template, 4, 0, "button", 59);
    \u0275\u0275conditionalCreate(2, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_2_Template, 4, 0, "button", 60);
    \u0275\u0275conditionalCreate(3, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_3_Template, 5, 0, "div", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sol_r2 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canEdit() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canDelete() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(sol_r2["ctestado_id"] === 387 ? 3 : -1);
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "button", 55);
    \u0275\u0275listener("click", function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const sol_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.toggleMenu(sol_r2.id, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 56);
    \u0275\u0275element(3, "path", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(4, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Template, 4, 3, "div", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sol_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.openMenuId === sol_r2.id ? 4 : -1);
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "td", 19)(3, "div", 31);
    \u0275\u0275conditionalCreate(4, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_4_Template, 3, 1, "button", 47);
    \u0275\u0275conditionalCreate(5, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_5_Template, 3, 1, "button", 48);
    \u0275\u0275conditionalCreate(6, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Template, 5, 1, "div", 49);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sol_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("title", ctx_r0.getFieldValue(sol_r2, "val_observaciones"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldValue(sol_r2, "val_observaciones"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.canAutorizar() ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canRechazar() ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canEdit() || ctx_r0.canDelete() || sol_r2["ctestado_id"] === 387 ? 6 : -1);
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sol_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("title", ctx_r0.getFieldValue(sol_r2, "val_observaciones"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldValue(sol_r2, "val_observaciones"), " ");
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 36)(1, "td", 37);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 38);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 39);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 38);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 38);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 39);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 40);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 39);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 13);
    \u0275\u0275conditionalCreate(18, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_18_Template, 2, 0, "span", 41)(19, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_19_Template, 2, 0, "span", 42)(20, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_20_Template, 2, 0, "span", 43)(21, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_21_Template, 2, 0, "span", 44)(22, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_22_Template, 2, 1, "span", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(23, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Template, 7, 5)(24, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_24_Template, 2, 2, "td", 46);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sol_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("bg-amber-50", ctx_r0.editingRecordId === sol_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (ctx_r0.currentPage - 1) * ctx_r0.PAGE_SIZE + sol_r2["_flatIdx"] + 1, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldValue(sol_r2, "val_fecha_movilizacion"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.getFieldValue(sol_r2, "val_lugar_destino"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldValue(sol_r2, "val_lugar_destino"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldValue(sol_r2, "val_hora_salida"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldValue(sol_r2, "val_hora_retorno"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.getEmployeeName("val_funcionario_id", ctx_r0.getFieldValue(sol_r2, "val_funcionario_id")));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getEmployeeName("val_funcionario_id", ctx_r0.getFieldValue(sol_r2, "val_funcionario_id")), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldValue(sol_r2, "val_num_ocupantes"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.getFieldValue(sol_r2, "val_motivo_movilizacion"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldValue(sol_r2, "val_motivo_movilizacion"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(sol_r2["ctestado_id"] === 388 ? 18 : sol_r2["ctestado_id"] === 2 ? 19 : sol_r2["ctestado_id"] === 387 ? 20 : sol_r2["ctestado_id"] === 51 ? 21 : 22);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.hasAnyAction ? 23 : 24);
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 34);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(3, PorContraloriaLista_Conditional_39_Conditional_1_For_1_For_4_Template, 25, 15, "tr", 35, _forTrack12);
  }
  if (rf & 2) {
    const grupo_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r0.hasAnyAction ? 11 : 10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", grupo_r9.diaLabel, " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(grupo_r9.items);
  }
}
function PorContraloriaLista_Conditional_39_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, PorContraloriaLista_Conditional_39_Conditional_1_For_1_Template, 5, 2, null, null, _forTrack02);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r0.solicitudesAgrupadas);
  }
}
function PorContraloriaLista_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PorContraloriaLista_Conditional_39_Conditional_0_Template, 3, 1, "tr")(1, PorContraloriaLista_Conditional_39_Conditional_1_Template, 2, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.solicitudesAgrupadas.length === 0 ? 0 : 1);
  }
}
function PorContraloriaLista_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275listener("click", function PorContraloriaLista_Conditional_41_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeMenu());
    });
    \u0275\u0275elementEnd();
  }
}
var ESTADO_AUTORIZADO = 387;
var ESTADO_RECHAZADO = 51;
var PorContraloriaLista = class _PorContraloriaLista {
  reportSolicitudService;
  solicitudService;
  authService;
  zone;
  toastrAlert;
  sanitizer;
  formularioId = null;
  fields = [];
  editingRecordId = null;
  editar = new EventEmitter();
  todasSolicitudes = [];
  solicitudes = [];
  metaTabla = null;
  currentPage = 1;
  loadingTabla = false;
  PAGE_SIZE = 10;
  showPdfModal = false;
  isPdfCargando = false;
  pdfPreviewUrl = null;
  pdfBlobUrl = null;
  openMenuId = null;
  procesandoId = null;
  userAppRole = computed(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return Object.values(AppRole).find((r) => roles.includes(r)) ?? null;
  }, ...ngDevMode ? [{ debugName: "userAppRole" }] : []);
  canEdit = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.POR_CONTRALORIA, role, "editar") : false;
  }, ...ngDevMode ? [{ debugName: "canEdit" }] : []);
  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.POR_CONTRALORIA, role, "eliminar") : false;
  }, ...ngDevMode ? [{ debugName: "canDelete" }] : []);
  canAutorizar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.POR_CONTRALORIA, role, "autorizar") : false;
  }, ...ngDevMode ? [{ debugName: "canAutorizar" }] : []);
  canRechazar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.POR_CONTRALORIA, role, "rechazar") : false;
  }, ...ngDevMode ? [{ debugName: "canRechazar" }] : []);
  get hasAnyAction() {
    return this.canEdit() || this.canDelete() || this.canAutorizar() || this.canRechazar();
  }
  destroy$ = new Subject();
  constructor(reportSolicitudService, solicitudService, authService, zone, toastrAlert, sanitizer) {
    this.reportSolicitudService = reportSolicitudService;
    this.solicitudService = solicitudService;
    this.authService = authService;
    this.zone = zone;
    this.toastrAlert = toastrAlert;
    this.sanitizer = sanitizer;
  }
  ngOnInit() {
    if (this.formularioId) {
      this.cargarDatos();
    }
  }
  ngOnChanges(changes) {
    if (changes["formularioId"]?.currentValue && !changes["formularioId"].isFirstChange()) {
      this.cargarDatos();
    }
  }
  ngOnDestroy() {
    if (this.pdfBlobUrl) {
      URL.revokeObjectURL(this.pdfBlobUrl);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
  toggleMenu(id, event) {
    event.stopPropagation();
    this.openMenuId = this.openMenuId === id ? null : id;
  }
  closeMenu() {
    this.openMenuId = null;
  }
  cargarDatos() {
    if (!this.formularioId)
      return;
    this.loadingTabla = true;
    forkJoin([
      this.reportSolicitudService.getValoresByTipoFormulario(1003),
      this.reportSolicitudService.getSolicitudesByFormulario(this.formularioId)
    ]).pipe(takeUntil(this.destroy$)).subscribe({
      next: ([valores, solicitudes]) => {
        this.zone.run(() => {
          const estadoMap = new Map(solicitudes.map((s) => [s.id_solicitud, s]));
          const records = this.agruparPorSolicitud(valores);
          for (const r of records) {
            const s = estadoMap.get(r.id);
            if (s) {
              r["ctestado_id"] = s.ctestado_id;
              r["estado_solicitud"] = s.estado_solicitud;
              r["_solicitud"] = s;
            }
          }
          this.todasSolicitudes = records;
          this.irAPagina(1);
          this.loadingTabla = false;
        });
      },
      error: () => {
        this.zone.run(() => {
          this.loadingTabla = false;
          this.toastrAlert.showError("No se pudo cargar el cronograma.", "Error");
        });
      }
    });
  }
  irAPagina(page) {
    this.currentPage = page;
    const start = (page - 1) * this.PAGE_SIZE;
    this.solicitudes = this.todasSolicitudes.slice(start, start + this.PAGE_SIZE);
    const total = this.todasSolicitudes.length;
    const totalPages = Math.ceil(total / this.PAGE_SIZE);
    this.metaTabla = {
      page,
      total,
      totalPages,
      limit: this.PAGE_SIZE,
      skip: start,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null
    };
  }
  agruparPorSolicitud(items) {
    const grouped = /* @__PURE__ */ new Map();
    for (const item of items) {
      if (!grouped.has(item.id_solicitud)) {
        grouped.set(item.id_solicitud, {
          id: item.id_solicitud,
          nombres_completos: item.nombres_completos,
          fecha_creacion: item.fecha_creacion
        });
      }
      const record = grouped.get(item.id_solicitud);
      const esSeleccion = item.ctipo_dato_nombre === "Selecci\xF3n Simple";
      const valor = (esSeleccion && item.valor_catalogo != null ? Number(item.valor_catalogo) || null : null) ?? item.valor_texto ?? item.valor_fecha ?? (item.valor_numero != null ? String(item.valor_numero) : null) ?? (item.valor_booleano != null ? String(item.valor_booleano) : null) ?? "\u2014";
      record[item.atributo_formulario_nombre] = valor;
    }
    return Array.from(grouped.values());
  }
  parseFecha(fecha) {
    if (!fecha || fecha === "\u2014")
      return null;
    const iso = new Date(fecha.includes("T") ? fecha : fecha + "T12:00:00");
    if (!isNaN(iso.getTime()))
      return iso;
    const parts = fecha.split("/");
    if (parts.length === 3) {
      const [d, m, y] = parts;
      return /* @__PURE__ */ new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}T12:00:00`);
    }
    return null;
  }
  get solicitudesAgrupadas() {
    const DIAS = ["DOMINGO", "LUNES", "MARTES", "MI\xC9RCOLES", "JUEVES", "VIERNES", "S\xC1BADO"];
    const MESES = [
      "ENERO",
      "FEBRERO",
      "MARZO",
      "ABRIL",
      "MAYO",
      "JUNIO",
      "JULIO",
      "AGOSTO",
      "SEPTIEMBRE",
      "OCTUBRE",
      "NOVIEMBRE",
      "DICIEMBRE"
    ];
    let flatIdx = 0;
    const groups = /* @__PURE__ */ new Map();
    for (const sol of this.solicitudes) {
      const fechaStr = String(sol["val_fecha_movilizacion"] ?? "\u2014");
      const d = this.parseFecha(fechaStr);
      const groupKey = d ? fechaStr : "\u2014";
      const sortKey = d ? d.getTime() : 0;
      const diaLabel = d ? `${d.getDay() === 0 || d.getDay() === 6 ? "FIN DE SEMANA" : DIAS[d.getDay()]}  \xB7  ${d.getDate()} DE ${MESES[d.getMonth()]} ${d.getFullYear()}` : "SIN FECHA";
      if (!groups.has(groupKey))
        groups.set(groupKey, { diaLabel, sortKey, items: [] });
      groups.get(groupKey).items.push(__spreadProps(__spreadValues({}, sol), { _flatIdx: flatIdx++ }));
    }
    return Array.from(groups.entries()).sort(([, a], [, b]) => a.sortKey - b.sortKey).map(([groupKey, { diaLabel, items }]) => ({ groupKey, diaLabel, items }));
  }
  getFieldValue(record, key) {
    return record[key] ?? "\u2014";
  }
  getEmployeeName(fieldKey, value) {
    if (!value || value === "\u2014")
      return "\u2014";
    const field = this.fields.find((f) => f.key === fieldKey);
    if (!field?.employeeList?.length)
      return String(value);
    const uuid = String(value).toLowerCase();
    const emp = field.employeeList.find((e) => e.empleado_id.toLowerCase() === uuid);
    return emp?.nombre_empleado ?? String(value);
  }
  async eliminarRegistro(record) {
    const confirm = await import_sweetalert2.default.fire({
      icon: "warning",
      title: "\xBFEliminar registro?",
      text: "Esta acci\xF3n no se puede deshacer.",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "S\xED, eliminar",
      cancelButtonText: "Cancelar"
    });
    if (!confirm.isConfirmed)
      return;
    try {
      await firstValueFrom(this.reportSolicitudService.eliminarContraloria(record.id));
      this.zone.run(() => {
        this.toastrAlert.showSuccess("Registro eliminado correctamente.", "\xA1Eliminado!");
        this.cargarDatos();
      });
    } catch {
      this.zone.run(() => this.toastrAlert.showError("No se pudo eliminar el registro.", "Error"));
    }
  }
  async autorizarRegistro(record) {
    const sol = record["_solicitud"];
    if (!sol)
      return;
    const confirm = await import_sweetalert2.default.fire({
      icon: "question",
      title: "\xBFAutorizar orden de movilizaci\xF3n?",
      text: "Se aprobar\xE1 la orden seleccionada.",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "S\xED, autorizar",
      cancelButtonText: "Cancelar"
    });
    if (!confirm.isConfirmed)
      return;
    this.procesandoId = record.id;
    this.solicitudService.actualizarSolicitud(sol.id_solicitud, {
      ctestado_id: ESTADO_AUTORIZADO,
      formulario_id: sol.formulario_id,
      usuario_id: sol.usuario_id,
      entidad_id: sol.establecimiento_id,
      secuencial_id: sol.secuencial_id,
      periodo_id: sol.periodo_id,
      descripcion: sol.descripcion_solicitud,
      estado: sol.estado_logico_solicitud,
      num_secuencial: sol.num_secuencial
    }).pipe(takeUntil(this.destroy$), finalize(() => {
      this.procesandoId = null;
    })).subscribe({
      next: () => this.zone.run(() => {
        this.toastrAlert.showSuccess("Orden autorizada correctamente.", "\xA1Autorizado!");
        this.cargarDatos();
      }),
      error: () => this.zone.run(() => this.toastrAlert.showError("No se pudo autorizar el registro.", "Error"))
    });
  }
  async rechazarRegistro(record) {
    const sol = record["_solicitud"];
    if (!sol)
      return;
    const { isConfirmed } = await import_sweetalert2.default.fire({
      icon: "warning",
      title: "Rechazar orden de movilizaci\xF3n",
      text: `Se rechazar\xE1 la orden ${sol.num_secuencial ?? sol.id_solicitud}.`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "S\xED, rechazar",
      cancelButtonText: "Cancelar"
    });
    if (!isConfirmed)
      return;
    this.procesandoId = record.id;
    this.solicitudService.actualizarSolicitud(sol.id_solicitud, {
      ctestado_id: ESTADO_RECHAZADO,
      formulario_id: sol.formulario_id,
      usuario_id: sol.usuario_id,
      entidad_id: sol.establecimiento_id,
      secuencial_id: sol.secuencial_id,
      periodo_id: sol.periodo_id,
      descripcion: sol.descripcion_solicitud,
      estado: sol.estado_logico_solicitud,
      num_secuencial: sol.num_secuencial
    }).pipe(takeUntil(this.destroy$), finalize(() => {
      this.procesandoId = null;
    })).subscribe({
      next: () => this.zone.run(() => {
        this.toastrAlert.showWarning("Orden rechazada.", "Rechazado");
        this.cargarDatos();
      }),
      error: () => this.zone.run(() => this.toastrAlert.showError("No se pudo rechazar el registro.", "Error"))
    });
  }
  imprimirRegistro(record) {
    this.showPdfModal = true;
    this.isPdfCargando = true;
    this.pdfPreviewUrl = null;
    if (this.pdfBlobUrl) {
      URL.revokeObjectURL(this.pdfBlobUrl);
      this.pdfBlobUrl = null;
    }
    this.solicitudService.getPdfVehiculo(record.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (blob) => this.zone.run(() => {
        this.pdfBlobUrl = URL.createObjectURL(blob);
        this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfBlobUrl);
        this.isPdfCargando = false;
      }),
      error: () => this.zone.run(() => {
        this.isPdfCargando = false;
        this.toastrAlert.showError("No se pudo cargar el documento PDF.", "Error");
      })
    });
  }
  cerrarPdf() {
    this.showPdfModal = false;
    this.pdfPreviewUrl = null;
    if (this.pdfBlobUrl) {
      URL.revokeObjectURL(this.pdfBlobUrl);
      this.pdfBlobUrl = null;
    }
  }
  descargarPdf() {
    if (!this.pdfBlobUrl)
      return;
    const a = document.createElement("a");
    a.href = this.pdfBlobUrl;
    a.download = "orden-movilizacion.pdf";
    a.click();
  }
  static \u0275fac = function PorContraloriaLista_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PorContraloriaLista)(\u0275\u0275directiveInject(ReportSolicitudService), \u0275\u0275directiveInject(SolicitudService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ToastrAlertService), \u0275\u0275directiveInject(DomSanitizer));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PorContraloriaLista, selectors: [["app-por-contraloria-lista"]], inputs: { formularioId: "formularioId", fields: "fields", editingRecordId: "editingRecordId" }, outputs: { editar: "editar" }, features: [\u0275\u0275NgOnChangesFeature], decls: 43, vars: 10, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "overflow-hidden"], [1, "overflow-x-auto", "custom-scroll"], [1, "w-full", "text-sm", "border-collapse", "table-fixed"], [1, "w-[38px]"], [1, "w-[85px]"], [1, "w-[150px]"], [1, "w-[55px]"], [1, "w-[100px]"], [1, "w-[58px]"], [1, "w-[95px]"], [1, "w-[82px]"], [1, "w-[118px]"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-slate-200", "tracking-wider"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-left"], [1, "px-3", "py-2.5", "text-left"], ["itemLabel", "registros", 3, "pageChange", "meta", "currentPage", "itemsShown"], [1, "fixed", "inset-0", "z-40"], ["titulo", "Orden de Movilizaci\xF3n", 3, "closed", "downloaded", "visible", "loading", "pdfUrl"], [1, "px-2", "py-2.5", "text-center"], [1, "border-b", "border-slate-200", "animate-pulse"], [1, "px-3", "py-3", "border-r", "border-slate-100"], [1, "h-3", "bg-slate-200", "rounded", "w-3/4", "mx-auto"], [1, "h-3", "bg-slate-200", "rounded", "w-2/3"], [1, "h-3", "bg-slate-200", "rounded", "w-2/3", "mx-auto"], [1, "h-3", "bg-slate-200", "rounded", "w-4/5"], [1, "h-3", "bg-slate-200", "rounded", "w-1/2", "mx-auto"], [1, "h-3", "bg-slate-200", "rounded", "w-3/4"], [1, "h-5", "bg-slate-200", "rounded", "w-4/5", "mx-auto"], [1, "px-3", "py-3"], [1, "px-2", "py-3"], [1, "flex", "items-center", "justify-center", "gap-1.5"], [1, "h-8", "w-8", "bg-slate-200", "rounded"], [1, "p-10", "text-slate-400", "italic", "text-center"], [1, "py-3", "px-4", "text-center", "font-bold", "italic", "text-[#1e3a8a]", "bg-blue-50/40", "border-y", "border-slate-200", "text-sm", "tracking-widest", "uppercase"], [1, "border-b", "border-slate-200", "hover:bg-slate-50", "transition-colors", 3, "bg-amber-50"], [1, "border-b", "border-slate-200", "hover:bg-slate-50", "transition-colors"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center", "font-mono", "text-slate-400", "text-xs"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center", "text-slate-500", "whitespace-nowrap", "text-xs"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-slate-600", "truncate", 3, "title"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center", "text-slate-600"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-blue-400", "text-blue-700", "font-bold", "text-[10px]", "rounded", "bg-blue-50"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-amber-400", "text-amber-700", "font-bold", "text-[10px]", "rounded", "bg-amber-50"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-green-400", "text-green-700", "font-bold", "text-[10px]", "rounded", "bg-green-50"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-red-400", "text-red-700", "font-bold", "text-[10px]", "rounded", "bg-red-50"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-slate-300", "text-slate-500", "font-bold", "text-[10px]", "rounded", "bg-slate-50"], [1, "px-3", "py-2.5", "text-slate-600", "truncate", 3, "title"], ["type", "button", "title", "Autorizar", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-green-400", "text-green-700", "bg-green-50", "hover:bg-green-100", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", "shrink-0", 3, "disabled"], ["type", "button", "title", "Rechazar", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-red-300", "text-red-600", "bg-red-50", "hover:bg-red-100", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", "shrink-0", 3, "disabled"], [1, "relative"], ["type", "button", "title", "Autorizar", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-green-400", "text-green-700", "bg-green-50", "hover:bg-green-100", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", "shrink-0", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], ["type", "button", "title", "Rechazar", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-red-300", "text-red-600", "bg-red-50", "hover:bg-red-100", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", "shrink-0", 3, "click", "disabled"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"], ["type", "button", "title", "M\xE1s acciones", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-slate-300", "text-slate-500", "bg-white", "hover:bg-slate-100", "transition-colors", "shrink-0", 3, "click"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "h-4", "w-4"], ["d", "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"], [1, "absolute", "right-0", "top-full", "mt-1", "z-50", "bg-white", "border", "border-slate-200", "rounded-lg", "shadow-lg", "py-1", "w-40"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-red-600", "hover:bg-red-50"], [1, "border-t", "border-slate-100", "mt-1", "pt-1"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-red-600", "hover:bg-red-50", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-slate-600", "hover:bg-slate-50", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"], [1, "fixed", "inset-0", "z-40", 3, "click"]], template: function PorContraloriaLista_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "table", 2)(3, "colgroup");
      \u0275\u0275element(4, "col", 3)(5, "col", 4)(6, "col", 5)(7, "col", 6)(8, "col", 6)(9, "col", 7)(10, "col", 8)(11, "col", 9)(12, "col", 7)(13, "col", 10);
      \u0275\u0275conditionalCreate(14, PorContraloriaLista_Conditional_14_Template, 1, 0, "col", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "thead")(16, "tr", 12)(17, "th", 13);
      \u0275\u0275text(18, "No.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "th", 13);
      \u0275\u0275text(20, "Fecha");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "th", 14);
      \u0275\u0275text(22, "Lugar de Destino");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "th", 13);
      \u0275\u0275text(24, "Salida");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "th", 13);
      \u0275\u0275text(26, "Retorno");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "th", 14);
      \u0275\u0275text(28, "Funcionario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "th", 13);
      \u0275\u0275text(30, "Ocupantes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "th", 14);
      \u0275\u0275text(32, "Motivo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "th", 13);
      \u0275\u0275text(34, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(35, PorContraloriaLista_Conditional_35_Template, 4, 0)(36, PorContraloriaLista_Conditional_36_Template, 2, 0, "th", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "tbody");
      \u0275\u0275conditionalCreate(38, PorContraloriaLista_Conditional_38_Template, 2, 1)(39, PorContraloriaLista_Conditional_39_Template, 2, 1);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(40, "app-pagination", 16);
      \u0275\u0275listener("pageChange", function PorContraloriaLista_Template_app_pagination_pageChange_40_listener($event) {
        return ctx.irAPagina($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(41, PorContraloriaLista_Conditional_41_Template, 1, 0, "div", 17);
      \u0275\u0275elementStart(42, "app-pdf-viewer", 18);
      \u0275\u0275listener("closed", function PorContraloriaLista_Template_app_pdf_viewer_closed_42_listener() {
        return ctx.cerrarPdf();
      })("downloaded", function PorContraloriaLista_Template_app_pdf_viewer_downloaded_42_listener() {
        return ctx.descargarPdf();
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275conditional(ctx.hasAnyAction ? 14 : -1);
      \u0275\u0275advance(21);
      \u0275\u0275conditional(ctx.hasAnyAction ? 35 : 36);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.loadingTabla ? 38 : 39);
      \u0275\u0275advance(2);
      \u0275\u0275property("meta", ctx.metaTabla)("currentPage", ctx.currentPage)("itemsShown", ctx.solicitudes.length);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.openMenuId !== null ? 41 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("visible", ctx.showPdfModal)("loading", ctx.isPdfCargando)("pdfUrl", ctx.pdfPreviewUrl);
    }
  }, dependencies: [CommonModule, PaginationComponent, PdfViewerComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PorContraloriaLista, [{
    type: Component,
    args: [{ selector: "app-por-contraloria-lista", imports: [CommonModule, PaginationComponent, PdfViewerComponent], template: `<div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
  <div class="overflow-x-auto custom-scroll">
    <table class="w-full text-sm border-collapse table-fixed">
      <colgroup>
        <col class="w-[38px]">
        <col class="w-[85px]">
        <col class="w-[150px]">
        <col class="w-[55px]">
        <col class="w-[55px]">
        <col class="w-[100px]">
        <col class="w-[58px]">
        <col class="w-[95px]">
        <col class="w-[100px]">
        <col class="w-[82px]">
        @if (hasAnyAction) {
          <col class="w-[118px]">
        }
      </colgroup>

      <thead>
        <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
          <th class="px-3 py-2.5 border-r border-slate-100 text-center">No.</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-center">Fecha</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-left">Lugar de Destino</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-center">Salida</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-center">Retorno</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-left">Funcionario</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-center">Ocupantes</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-left">Motivo</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-center">Estado</th>
          @if (hasAnyAction) {
            <th class="px-3 py-2.5 border-r border-slate-100 text-left">Observaciones</th>
            <th class="px-2 py-2.5 text-center">Acciones</th>
          } @else {
            <th class="px-3 py-2.5 text-left">Observaciones</th>
          }
        </tr>
      </thead>

      <tbody>
        @if (loadingTabla) {
          @for (_ of [1,2,3,4,5,6,7,8]; track $index) {
            <tr class="border-b border-slate-200 animate-pulse">
              <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-3/4 mx-auto"></div></td>
              <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-3/4 mx-auto"></div></td>
              <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-2/3"></div></td>
              <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-2/3 mx-auto"></div></td>
              <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-2/3 mx-auto"></div></td>
              <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-4/5"></div></td>
              <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-1/2 mx-auto"></div></td>
              <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-3/4"></div></td>
              <td class="px-3 py-3 border-r border-slate-100"><div class="h-5 bg-slate-200 rounded w-4/5 mx-auto"></div></td>
              @if (hasAnyAction) {
                <td class="px-3 py-3 border-r border-slate-100"><div class="h-3 bg-slate-200 rounded w-3/4"></div></td>
                <td class="px-2 py-3">
                  <div class="flex items-center justify-center gap-1.5">
                    <div class="h-8 w-8 bg-slate-200 rounded"></div>
                    <div class="h-8 w-8 bg-slate-200 rounded"></div>
                  </div>
                </td>
              } @else {
                <td class="px-3 py-3"><div class="h-3 bg-slate-200 rounded w-3/4"></div></td>
              }
            </tr>
          }
        } @else {
          @if (solicitudesAgrupadas.length === 0) {
            <tr>
              <td [attr.colspan]="hasAnyAction ? 11 : 10" class="p-10 text-slate-400 italic text-center">
                No hay \xF3rdenes de movilizaci\xF3n registradas.
              </td>
            </tr>
          } @else {
            @for (grupo of solicitudesAgrupadas; track grupo.groupKey) {

              <tr>
                <td
                  [attr.colspan]="hasAnyAction ? 11 : 10"
                  class="py-3 px-4 text-center font-bold italic text-[#1e3a8a] bg-blue-50/40 border-y border-slate-200 text-sm tracking-widest uppercase"
                >
                  {{ grupo.diaLabel }}
                </td>
              </tr>

              @for (sol of grupo.items; track sol.id) {
                <tr
                  class="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                  [class.bg-amber-50]="editingRecordId === sol.id"
                >
                  <td class="px-3 py-2.5 border-r border-slate-100 text-center font-mono text-slate-400 text-xs">
                    {{ (currentPage - 1) * PAGE_SIZE + $any(sol['_flatIdx']) + 1 }}
                  </td>
                  <td class="px-3 py-2.5 border-r border-slate-100 text-center text-slate-500 whitespace-nowrap text-xs">
                    {{ getFieldValue(sol, 'val_fecha_movilizacion') }}
                  </td>
                  <td class="px-3 py-2.5 border-r border-slate-100 text-slate-600 truncate"
                      [title]="$any(getFieldValue(sol, 'val_lugar_destino'))">
                    {{ getFieldValue(sol, 'val_lugar_destino') }}
                  </td>
                  <td class="px-3 py-2.5 border-r border-slate-100 text-center text-slate-500 whitespace-nowrap text-xs">
                    {{ getFieldValue(sol, 'val_hora_salida') }}
                  </td>
                  <td class="px-3 py-2.5 border-r border-slate-100 text-center text-slate-500 whitespace-nowrap text-xs">
                    {{ getFieldValue(sol, 'val_hora_retorno') }}
                  </td>
                  <td class="px-3 py-2.5 border-r border-slate-100 text-slate-600 truncate"
                      [title]="getEmployeeName('val_funcionario_id', getFieldValue(sol, 'val_funcionario_id'))">
                    {{ getEmployeeName('val_funcionario_id', getFieldValue(sol, 'val_funcionario_id')) }}
                  </td>
                  <td class="px-3 py-2.5 border-r border-slate-100 text-center text-slate-600">
                    {{ getFieldValue(sol, 'val_num_ocupantes') }}
                  </td>
                  <td class="px-3 py-2.5 border-r border-slate-100 text-slate-600 truncate"
                      [title]="$any(getFieldValue(sol, 'val_motivo_movilizacion'))">
                    {{ getFieldValue(sol, 'val_motivo_movilizacion') }}
                  </td>
                  <td class="px-3 py-2.5 border-r border-slate-100 text-center">
                    @if ($any(sol['ctestado_id']) === 388) {
                      <span class="block w-full text-center py-0.5 border border-blue-400 text-blue-700 font-bold text-[10px] rounded bg-blue-50">Creado</span>
                    } @else if ($any(sol['ctestado_id']) === 2) {
                      <span class="block w-full text-center py-0.5 border border-amber-400 text-amber-700 font-bold text-[10px] rounded bg-amber-50">Pendiente</span>
                    } @else if ($any(sol['ctestado_id']) === 387) {
                      <span class="block w-full text-center py-0.5 border border-green-400 text-green-700 font-bold text-[10px] rounded bg-green-50">Autorizado</span>
                    } @else if ($any(sol['ctestado_id']) === 51) {
                      <span class="block w-full text-center py-0.5 border border-red-400 text-red-700 font-bold text-[10px] rounded bg-red-50">Rechazado</span>
                    } @else {
                      <span class="block w-full text-center py-0.5 border border-slate-300 text-slate-500 font-bold text-[10px] rounded bg-slate-50">{{ sol['estado_solicitud'] ?? '\u2014' }}</span>
                    }
                  </td>
                  @if (hasAnyAction) {
                    <td class="px-3 py-2.5 border-r border-slate-100 text-slate-600 truncate"
                        [title]="$any(getFieldValue(sol, 'val_observaciones'))">
                      {{ getFieldValue(sol, 'val_observaciones') }}
                    </td>
                    <td class="px-2 py-2.5 text-center">
                      <div class="flex items-center justify-center gap-1.5">
                        @if (canAutorizar()) {
                          <button type="button" title="Autorizar"
                            (click)="autorizarRegistro(sol)"
                            [disabled]="procesandoId === sol.id"
                            class="h-8 w-8 flex items-center justify-center rounded border border-green-400 text-green-700 bg-green-50 hover:bg-green-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0">
                            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        }
                        @if (canRechazar()) {
                          <button type="button" title="Rechazar"
                            (click)="rechazarRegistro(sol)"
                            [disabled]="procesandoId === sol.id"
                            class="h-8 w-8 flex items-center justify-center rounded border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0">
                            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        }
                        @if (canEdit() || canDelete() || $any(sol['ctestado_id']) === 387) {
                          <div class="relative">
                            <button type="button" title="M\xE1s acciones"
                              (click)="toggleMenu(sol.id, $event)"
                              class="h-8 w-8 flex items-center justify-center rounded border border-slate-300 text-slate-500 bg-white hover:bg-slate-100 transition-colors shrink-0">
                              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                              </svg>
                            </button>
                            @if (openMenuId === sol.id) {
                              <div class="absolute right-0 top-full mt-1 z-50 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-40">
                                @if (canEdit()) {
                                  <button type="button" (click)="editar.emit(sol); closeMenu()"
                                    class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-amber-700 hover:bg-amber-50">
                                    <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Editar
                                  </button>
                                }
                                @if (canDelete()) {
                                  <button type="button" (click)="eliminarRegistro(sol); closeMenu()"
                                    class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50">
                                    <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Eliminar
                                  </button>
                                }
                                @if ($any(sol['ctestado_id']) === 387) {
                                  <div class="border-t border-slate-100 mt-1 pt-1">
                                    <button type="button" (click)="imprimirRegistro(sol); closeMenu()"
                                      class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50">
                                      <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                      </svg>
                                      Imprimir
                                    </button>
                                  </div>
                                }
                              </div>
                            }
                          </div>
                        }
                      </div>
                    </td>
                  } @else {
                    <td class="px-3 py-2.5 text-slate-600 truncate"
                        [title]="$any(getFieldValue(sol, 'val_observaciones'))">
                      {{ getFieldValue(sol, 'val_observaciones') }}
                    </td>
                  }
                </tr>
              }

            }
          }
        }
      </tbody>
    </table>
  </div>

  <app-pagination
    [meta]="metaTabla"
    [currentPage]="currentPage"
    [itemsShown]="solicitudes.length"
    itemLabel="registros"
    (pageChange)="irAPagina($event)">
  </app-pagination>
</div>

@if (openMenuId !== null) {
  <div class="fixed inset-0 z-40" (click)="closeMenu()"></div>
}

<app-pdf-viewer
  [visible]="showPdfModal"
  [loading]="isPdfCargando"
  [pdfUrl]="pdfPreviewUrl"
  titulo="Orden de Movilizaci\xF3n"
  (closed)="cerrarPdf()"
  (downloaded)="descargarPdf()">
</app-pdf-viewer>
` }]
  }], () => [{ type: ReportSolicitudService }, { type: SolicitudService }, { type: AuthService }, { type: NgZone }, { type: ToastrAlertService }, { type: DomSanitizer }], { formularioId: [{
    type: Input
  }], fields: [{
    type: Input
  }], editingRecordId: [{
    type: Input
  }], editar: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PorContraloriaLista, { className: "PorContraloriaLista", filePath: "src/app/features/por-contraloria/lista/por-contraloria-lista.ts", lineNumber: 32 });
})();

// src/app/features/por-contraloria/por-contraloria.ts
var PorContraloria = class _PorContraloria {
  authService;
  listaRef;
  editingRecord = null;
  formularioNombre = "Solicitud de transporte - Contralor\xEDa";
  fields = [];
  formularioId = null;
  userAppRole = computed(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return Object.values(AppRole).find((r) => roles.includes(r)) ?? null;
  }, ...ngDevMode ? [{ debugName: "userAppRole" }] : []);
  canCreate = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.POR_CONTRALORIA, role, "crear") : false;
  }, ...ngDevMode ? [{ debugName: "canCreate" }] : []);
  constructor(authService) {
    this.authService = authService;
  }
  onFormularioReady(event) {
    this.formularioNombre = event.nombre;
    this.fields = event.fields;
    this.formularioId = event.formularioId;
  }
  onEditar(record) {
    this.editingRecord = record;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  onGuardado() {
    this.editingRecord = null;
    this.listaRef?.cargarDatos();
  }
  onCancelado() {
    this.editingRecord = null;
  }
  static \u0275fac = function PorContraloria_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PorContraloria)(\u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PorContraloria, selectors: [["app-por-contraloria"]], viewQuery: function PorContraloria_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(PorContraloriaLista, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listaRef = _t.first);
    }
  }, decls: 6, vars: 5, consts: [[1, "p-6", "bg-slate-50", "min-h-screen", "text-slate-700", "font-sans", "pb-24"], [1, "max-w-7xl", "mx-auto"], [1, "animate-in", "fade-in"], ["breadcrumbSection", "Gesti\xF3n de Veh\xEDculos", "subtitle", "Complete la siguiente informaci\xF3n para solicitar un veh\xEDculo de la DMRCA", "codigoFormulario", "FOR.ADM.SVR.001.03", "edicion", "12", 3, "title"], [3, "formularioReady", "guardado", "cancelado", "editingRecord"], [3, "editar", "formularioId", "fields", "editingRecordId"]], template: function PorContraloria_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "app-page-header", 3);
      \u0275\u0275elementStart(4, "app-por-contraloria-formulario", 4);
      \u0275\u0275listener("formularioReady", function PorContraloria_Template_app_por_contraloria_formulario_formularioReady_4_listener($event) {
        return ctx.onFormularioReady($event);
      })("guardado", function PorContraloria_Template_app_por_contraloria_formulario_guardado_4_listener() {
        return ctx.onGuardado();
      })("cancelado", function PorContraloria_Template_app_por_contraloria_formulario_cancelado_4_listener() {
        return ctx.onCancelado();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "app-por-contraloria-lista", 5);
      \u0275\u0275listener("editar", function PorContraloria_Template_app_por_contraloria_lista_editar_5_listener($event) {
        return ctx.onEditar($event);
      });
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("title", ctx.formularioNombre);
      \u0275\u0275advance();
      \u0275\u0275property("editingRecord", ctx.editingRecord);
      \u0275\u0275advance();
      \u0275\u0275property("formularioId", ctx.formularioId)("fields", ctx.fields)("editingRecordId", (ctx.editingRecord == null ? null : ctx.editingRecord.id) ?? null);
    }
  }, dependencies: [CommonModule, PageHeader, PorContraloriaFormulario, PorContraloriaLista], styles: ["\n\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_animateIn 0.3s ease-out forwards;\n}\n.fade-in[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.slide-in-from-bottom-4[_ngcontent-%COMP%] {\n  transform: translateY(1rem);\n}\n.slide-in-from-right-4[_ngcontent-%COMP%] {\n  transform: translateX(1rem);\n}\n@keyframes _ngcontent-%COMP%_animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus, \ntextarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=por-contraloria.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PorContraloria, [{
    type: Component,
    args: [{ selector: "app-por-contraloria", standalone: true, imports: [CommonModule, PageHeader, PorContraloriaFormulario, PorContraloriaLista], template: '<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">\n  <div class="max-w-7xl mx-auto">\n    <div class="animate-in fade-in">\n\n      <app-page-header\n        breadcrumbSection="Gesti\xF3n de Veh\xEDculos"\n        [title]="formularioNombre"\n        subtitle="Complete la siguiente informaci\xF3n para solicitar un veh\xEDculo de la DMRCA"\n        codigoFormulario="FOR.ADM.SVR.001.03"\n        edicion="12"\n      />\n\n      <app-por-contraloria-formulario\n        [editingRecord]="editingRecord"\n        (formularioReady)="onFormularioReady($event)"\n        (guardado)="onGuardado()"\n        (cancelado)="onCancelado()"\n      />\n\n      <app-por-contraloria-lista\n        [formularioId]="formularioId"\n        [fields]="fields"\n        [editingRecordId]="editingRecord?.id ?? null"\n        (editar)="onEditar($event)"\n      />\n\n    </div>\n  </div>\n</div>\n', styles: ["/* src/app/features/por-contraloria/por-contraloria.css */\n.animate-in {\n  animation: animateIn 0.3s ease-out forwards;\n}\n.fade-in {\n  opacity: 0;\n}\n.slide-in-from-bottom-4 {\n  transform: translateY(1rem);\n}\n.slide-in-from-right-4 {\n  transform: translateX(1rem);\n}\n@keyframes animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput:focus,\nselect:focus,\ntextarea:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=por-contraloria.css.map */\n"] }]
  }], () => [{ type: AuthService }], { listaRef: [{
    type: ViewChild,
    args: [PorContraloriaLista]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PorContraloria, { className: "PorContraloria", filePath: "src/app/features/por-contraloria/por-contraloria.ts", lineNumber: 21 });
})();
export {
  PorContraloria
};
//# sourceMappingURL=chunk-GQQVW6WE.js.map
