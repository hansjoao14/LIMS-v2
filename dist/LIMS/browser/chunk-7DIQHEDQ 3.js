import {
  PdfViewerComponent
} from "./chunk-TN4ZILQR.js";
import {
  PeriodoService
} from "./chunk-CMF623OH.js";
import {
  LoadingComponent
} from "./chunk-6E7NIW7K.js";
import {
  ToastrAlertService
} from "./chunk-V2CIHOHZ.js";
import "./chunk-BBC4P6SM.js";
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
} from "./chunk-NAO2WYRM.js";
import {
  DomSanitizer
} from "./chunk-GSQNXGZJ.js";
import {
  AppRole,
  MenuKey,
  hasPermission
} from "./chunk-JI325HE7.js";
import {
  SolicitudService
} from "./chunk-QVQTLUKW.js";
import {
  ReportSolicitudService
} from "./chunk-62VLVXUV.js";
import {
  require_sweetalert2_all
} from "./chunk-ZCY535AF.js";
import {
  ReportFormularioService
} from "./chunk-AWRFUGXV.js";
import {
  PaginationComponent
} from "./chunk-NMFNKURB.js";
import {
  TableSkeleton
} from "./chunk-4XRDASKB.js";
import "./chunk-XIRXEHG5.js";
import {
  PageHeader
} from "./chunk-ULA2XVM4.js";
import "./chunk-DPKW7NRU.js";
import {
  AuthService,
  CommonModule,
  NgClass
} from "./chunk-CIDLATYD.js";
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
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-WHOAKDIK.js";

// src/app/features/horarios-laborales/formulario/horarios-laborales-formulario.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.empleado_id;
function HorariosLaboralesFormulario_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function HorariosLaboralesFormulario_Conditional_0_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 11);
    \u0275\u0275element(2, "path", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Editando registro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 13);
    \u0275\u0275listener("click", function HorariosLaboralesFormulario_Conditional_0_Conditional_2_Conditional_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.cancelarEdicion());
    });
    \u0275\u0275text(6, " Cancelar edici\xF3n ");
    \u0275\u0275elementEnd()();
  }
}
function HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1, " *");
    \u0275\u0275elementEnd();
  }
}
function HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_4_For_4_Template(rf, ctx) {
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
function HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "select", 20)(1, "option", 21);
    \u0275\u0275text(2, "Seleccione un funcionario...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_4_For_4_Template, 2, 2, "option", 22, _forTrack1);
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
function HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_5_For_4_Template(rf, ctx) {
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
function HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "select", 20)(1, "option", 21);
    \u0275\u0275text(2, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_5_For_4_Template, 2, 2, "option", 22, _forTrack0);
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
function HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "textarea", 23);
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("border-red-500", ctx_r2.esCampoInvalido(field_r5.key));
    \u0275\u0275property("formControlName", field_r5.key)("placeholder", field_r5.placeholder)("maxlength", field_r5.maxLength ?? 9999);
  }
}
function HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "input", 24);
  }
  if (rf & 2) {
    const field_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("border-red-500", ctx_r2.esCampoInvalido(field_r5.key));
    \u0275\u0275property("formControlName", field_r5.key)("type", ctx_r2.getInputType(field_r5))("placeholder", field_r5.placeholder);
    \u0275\u0275attribute("min", ctx_r2.getInputMin(field_r5))("max", ctx_r2.getInputMax(field_r5));
  }
}
function HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_8_Template(rf, ctx) {
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
function HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "label", 14);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_3_Template, 2, 0, "span", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_4_Template, 5, 3, "select", 16)(5, HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_5_Template, 5, 3, "select", 16)(6, HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_6_Template, 1, 5, "textarea", 17)(7, HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_7_Template, 1, 7, "input", 18);
    \u0275\u0275conditionalCreate(8, HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Conditional_8_Template, 2, 1, "span", 19);
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
    \u0275\u0275conditional(field_r5.controlType === "employee-list" ? 4 : field_r5.controlType === "select" ? 5 : field_r5.controlType === "textarea" ? 6 : 7);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.getFieldError(field_r5.key) ? 8 : -1);
  }
}
function HorariosLaboralesFormulario_Conditional_0_Conditional_2_Conditional_10_Template(rf, ctx) {
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
function HorariosLaboralesFormulario_Conditional_0_Conditional_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.editingRecord ? "ACTUALIZAR PROGRAMACI\xD3N" : "GUARDAR PROGRAMACI\xD3N", " ");
  }
}
function HorariosLaboralesFormulario_Conditional_0_Conditional_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function HorariosLaboralesFormulario_Conditional_0_Conditional_2_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.cancelarEdicion());
    });
    \u0275\u0275text(1, " Cancelar ");
    \u0275\u0275elementEnd();
  }
}
function HorariosLaboralesFormulario_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, HorariosLaboralesFormulario_Conditional_0_Conditional_2_Conditional_0_Template, 7, 0, "div", 2);
    \u0275\u0275elementStart(1, "form", 3);
    \u0275\u0275listener("ngSubmit", function HorariosLaboralesFormulario_Conditional_0_Conditional_2_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.guardar());
    });
    \u0275\u0275elementStart(2, "div", 4)(3, "h3", 5);
    \u0275\u0275text(4, "Programaci\xF3n semanal de veh\xEDculos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 6);
    \u0275\u0275repeaterCreate(6, HorariosLaboralesFormulario_Conditional_0_Conditional_2_For_7_Template, 9, 7, "div", 7, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 8)(9, "button", 9);
    \u0275\u0275conditionalCreate(10, HorariosLaboralesFormulario_Conditional_0_Conditional_2_Conditional_10_Template, 2, 1)(11, HorariosLaboralesFormulario_Conditional_0_Conditional_2_Conditional_11_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, HorariosLaboralesFormulario_Conditional_0_Conditional_2_Conditional_12_Template, 2, 0, "button", 10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r2.editingRecord ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r2.form);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.visibleFields);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("bg-amber-500", ctx_r2.editingRecord)("hover:bg-amber-600", ctx_r2.editingRecord)("bg-[#1e3a8a]", !ctx_r2.editingRecord)("hover:bg-[#2541b2]", !ctx_r2.editingRecord);
    \u0275\u0275property("disabled", ctx_r2.saving);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.saving ? 10 : 11);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.editingRecord ? 12 : -1);
  }
}
function HorariosLaboralesFormulario_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275conditionalCreate(1, HorariosLaboralesFormulario_Conditional_0_Conditional_1_Template, 1, 0, "app-loading")(2, HorariosLaboralesFormulario_Conditional_0_Conditional_2_Template, 13, 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("border-amber-400", ctx_r2.editingRecord);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.loading ? 1 : 2);
  }
}
var HorariosLaboralesFormulario = class _HorariosLaboralesFormulario {
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
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, "crear") : false;
  }, ...ngDevMode ? [{ debugName: "canCreate" }] : []);
  FIELD_SPAN = {
    val_funcionario_id: 2,
    val_observaciones: 2
  };
  getFieldSpanClass(key) {
    return (this.FIELD_SPAN[key] ?? 1) === 2 ? "sm:col-span-2 md:col-span-2" : "";
  }
  getMinDate() {
    return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  }
  getMaxDate() {
    const date = /* @__PURE__ */ new Date();
    let businessDays = 0;
    while (businessDays < 10) {
      date.setDate(date.getDate() + 1);
      const day = date.getDay();
      if (day !== 0 && day !== 6)
        businessDays++;
    }
    return date.toISOString().split("T")[0];
  }
  getInputMin(field) {
    switch (field.key) {
      case "val_fecha_programacion":
        return this.getMinDate();
      case "val_hora_salida":
        return "08:00";
      case "val_hora_retorno":
        return this.form.get("val_hora_salida")?.value || "08:00";
      default:
        return null;
    }
  }
  getInputMax(field) {
    switch (field.key) {
      case "val_fecha_programacion":
      case "val_hora_salida":
      case "val_hora_retorno":
        return field.key === "val_fecha_programacion" ? this.getMaxDate() : "16:30";
      default:
        return null;
    }
  }
  getFieldError(key) {
    const ctrl = this.form.get(key);
    if (!ctrl || !ctrl.invalid || !ctrl.touched && !ctrl.dirty)
      return null;
    if (ctrl.errors?.["required"])
      return "Este campo es requerido.";
    if (ctrl.errors?.["weekend"])
      return "Solo se permiten d\xEDas de lunes a viernes.";
    if (ctrl.errors?.["fueraDeRango"])
      return "Solo puede seleccionar d\xEDas de la semana actual (hasta el viernes).";
    if (ctrl.errors?.["retornoAntesSalida"])
      return "La hora de retorno no puede ser anterior a la de salida.";
    if (ctrl.errors?.["max"])
      return "M\xE1ximo hasta las 16:30.";
    if (ctrl.errors?.["min"])
      return "M\xEDnimo desde las 08:00.";
    return null;
  }
  applyBusinessRules() {
    const fechaCtrl = this.form.get("val_fecha_programacion");
    const salidaCtrl = this.form.get("val_hora_salida");
    const retornoCtrl = this.form.get("val_hora_retorno");
    if (fechaCtrl) {
      fechaCtrl.addValidators(this.weekdayValidator());
      fechaCtrl.updateValueAndValidity({ emitEvent: false });
    }
    if (salidaCtrl) {
      salidaCtrl.addValidators(this.timeRangeValidator("08:00", "16:30"));
      salidaCtrl.updateValueAndValidity({ emitEvent: false });
    }
    if (retornoCtrl) {
      retornoCtrl.addValidators(this.retornoAfterSalidaValidator());
      retornoCtrl.addValidators(this.timeRangeValidator("08:00", "16:30"));
      retornoCtrl.updateValueAndValidity({ emitEvent: false });
    }
    salidaCtrl?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => retornoCtrl?.updateValueAndValidity({ emitEvent: false }));
  }
  weekdayValidator() {
    return (control) => {
      if (!control.value)
        return null;
      const date = /* @__PURE__ */ new Date(control.value + "T12:00:00");
      const day = date.getDay();
      if (day === 0 || day === 6)
        return { weekend: true };
      const min = /* @__PURE__ */ new Date(this.getMinDate() + "T12:00:00");
      const max = /* @__PURE__ */ new Date(this.getMaxDate() + "T12:00:00");
      if (date < min || date > max)
        return { fueraDeRango: true };
      return null;
    };
  }
  retornoAfterSalidaValidator() {
    return (control) => {
      const salida = this.form?.get("val_hora_salida")?.value;
      if (!salida || !control.value)
        return null;
      return control.value < salida ? { retornoAntesSalida: true } : null;
    };
  }
  timeRangeValidator(min, max) {
    return (control) => {
      if (!control.value)
        return null;
      if (control.value < min)
        return { min: true };
      if (control.value > max)
        return { max: true };
      return null;
    };
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
    this.solicitudService.getFormulario("1002", id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (formulario) => {
        this.zone.run(() => {
          this.formulario = formulario;
          this.fields = formulario.preguntas.filter((p) => p.estado !== false).map((p) => this.toFieldConfig(p)).sort((a, b) => a.order - b.order);
          this.generateControls();
          this.applyBusinessRules();
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
    if (pregunta.nombre === "val_observaciones")
      return "textarea";
    if (pregunta.is_text_area && pregunta.nombre !== "val_descripcion_actividad")
      return "textarea";
    return "text";
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
  get visibleFields() {
    return this.fields.filter((f) => !f.hidden);
  }
  esCampoInvalido(key) {
    const c = this.form.get(key);
    return !!c && c.invalid && (c.touched || c.dirty);
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
        const mensaje = err?.error?.message ?? err?.message ?? "No se pudo actualizar el registro";
        this.toastrAlert.showError(mensaje, "Error");
      });
    }
  }
  static \u0275fac = function HorariosLaboralesFormulario_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HorariosLaboralesFormulario)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(SolicitudService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(PeriodoService), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ToastrAlertService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HorariosLaboralesFormulario, selectors: [["app-horarios-laborales-formulario"]], inputs: { editingRecord: "editingRecord" }, outputs: { guardado: "guardado", cancelado: "cancelado", formularioReady: "formularioReady" }, features: [\u0275\u0275NgOnChangesFeature], decls: 1, vars: 1, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-8", "mb-6", 3, "border-amber-400"], [1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "p-8", "mb-6"], [1, "flex", "items-center", "gap-3", "mb-6", "p-3", "bg-amber-50", "border", "border-amber-300", "rounded", "text-amber-800", "text-sm"], [3, "ngSubmit", "formGroup"], [1, "mb-6", "border-b", "border-slate-300", "pb-4"], [1, "text-lg", "font-bold", "text-[#1e3a8a]", "mb-1"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "gap-x-8", "gap-y-6"], [1, "flex", "flex-col", 3, "ngClass"], [1, "flex", "items-center", "gap-4", "pt-4", "border-t", "border-slate-300", "mt-8"], ["type", "submit", 1, "px-8", "py-2.5", "rounded", "text-sm", "font-bold", "shadow-md", "transition-all", "disabled:opacity-60", "disabled:cursor-not-allowed", "text-white", "flex", "items-center", "gap-2", 3, "disabled"], ["type", "button", 1, "bg-white", "border", "border-slate-300", "text-slate-700", "px-8", "py-2.5", "rounded", "text-sm", "font-bold", "shadow-sm", "hover:bg-slate-50", "transition-all"], ["fill", "none", "stroke", "currentColor", "stroke-width", "2", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M15.232 5.232l3.536 3.536M9 13l6-6m-6 6l-1.5 4.5L13 16l6-6-3.536-3.536L9 13z"], ["type", "button", 1, "ml-auto", "text-xs", "font-semibold", "text-amber-700", "hover:text-amber-900", "underline", "underline-offset-2", 3, "click"], [1, "block", "text-[11px]", "font-bold", "text-[#1e3a8a]", "uppercase", "mb-1"], [1, "text-red-500"], [1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "formControlName", "border-red-500"], ["rows", "3", 1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-3", "rounded", "text-sm", "resize-none", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "formControlName", "placeholder", "maxlength", "border-red-500"], [1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "formControlName", "type", "placeholder", "border-red-500"], [1, "text-red-500", "text-[11px]", "mt-1"], [1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "formControlName"], ["value", ""], [3, "value"], ["rows", "3", 1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-3", "rounded", "text-sm", "resize-none", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "formControlName", "placeholder", "maxlength"], [1, "w-full", "border", "border-slate-300", "bg-white", "text-slate-700", "p-2.5", "rounded", "text-sm", "outline-none", "focus:border-[#1e3a8a]", "transition-colors", 3, "formControlName", "type", "placeholder"], [1, "animate-spin", "h-4", "w-4", "border-2", "border-white", "border-t-transparent", "rounded-full"], ["type", "button", 1, "bg-white", "border", "border-slate-300", "text-slate-700", "px-8", "py-2.5", "rounded", "text-sm", "font-bold", "shadow-sm", "hover:bg-slate-50", "transition-all", 3, "click"]], template: function HorariosLaboralesFormulario_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, HorariosLaboralesFormulario_Conditional_0_Template, 3, 3, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.canCreate() || ctx.editingRecord ? 0 : -1);
    }
  }, dependencies: [CommonModule, NgClass, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, FormsModule, LoadingComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HorariosLaboralesFormulario, [{
    type: Component,
    args: [{ selector: "app-horarios-laborales-formulario", imports: [CommonModule, ReactiveFormsModule, FormsModule, LoadingComponent], template: `@if (canCreate() || editingRecord) {
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
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m-6 6l-1.5 4.5L13 16l6-6-3.536-3.536L9 13z"/>
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
          <h3 class="text-lg font-bold text-[#1e3a8a] mb-1">Programaci\xF3n semanal de veh\xEDculos</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
          @for (field of visibleFields; track field.id) {
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
              } @else if (field.controlType === 'textarea') {
                <textarea
                  [formControlName]="field.key"
                  rows="3"
                  [placeholder]="field.placeholder"
                  [maxlength]="field.maxLength ?? 9999"
                  class="w-full border border-slate-300 bg-white text-slate-700 p-3 rounded text-sm resize-none outline-none focus:border-[#1e3a8a] transition-colors"
                  [class.border-red-500]="esCampoInvalido(field.key)"
                ></textarea>
              } @else {
                <input
                  [formControlName]="field.key"
                  [type]="getInputType(field)"
                  [placeholder]="field.placeholder"
                  [attr.min]="getInputMin(field)"
                  [attr.max]="getInputMax(field)"
                  class="w-full border border-slate-300 bg-white text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1e3a8a] transition-colors"
                  [class.border-red-500]="esCampoInvalido(field.key)"
                />
              }

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
              {{ editingRecord ? 'ACTUALIZAR PROGRAMACI\xD3N' : 'GUARDAR PROGRAMACI\xD3N' }}
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HorariosLaboralesFormulario, { className: "HorariosLaboralesFormulario", filePath: "src/app/features/horarios-laborales/formulario/horarios-laborales-formulario.ts", lineNumber: 35 });
})();

// src/app/features/horarios-laborales/lista/horarios-laborales-lista.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
var _forTrack02 = ($index, $item) => $item.groupKey;
var _forTrack12 = ($index, $item) => $item.id;
function HorariosLaboralesLista_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "col", 12);
  }
}
function HorariosLaboralesLista_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 15);
    \u0275\u0275text(1, "Observaciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "th", 21);
    \u0275\u0275text(3, "Acciones");
    \u0275\u0275elementEnd();
  }
}
function HorariosLaboralesLista_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 16);
    \u0275\u0275text(1, "Observaciones");
    \u0275\u0275elementEnd();
  }
}
function HorariosLaboralesLista_Conditional_39_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 22);
    \u0275\u0275text(2, " No hay veh\xEDculos programados. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r0.hasAnyAction ? 11 : 10);
  }
}
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "Creado");
    \u0275\u0275elementEnd();
  }
}
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "Pendiente");
    \u0275\u0275elementEnd();
  }
}
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, "Autorizado");
    \u0275\u0275elementEnd();
  }
}
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "Rechazado");
    \u0275\u0275elementEnd();
  }
}
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sol_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(sol_r2["estado_solicitud"] ?? "\u2014");
  }
}
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const sol_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.autorizarRegistro(sol_r2));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 41);
    \u0275\u0275element(2, "path", 42);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sol_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r0.procesandoId === sol_r2.id);
  }
}
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 43);
    \u0275\u0275listener("click", function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const sol_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.rechazarRegistro(sol_r2));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 41);
    \u0275\u0275element(2, "path", 44);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sol_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r0.procesandoId === sol_r2.id);
  }
}
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const sol_r2 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      ctx_r0.editar.emit(sol_r2);
      return \u0275\u0275resetView(ctx_r0.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 53);
    \u0275\u0275element(2, "path", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Editar ");
    \u0275\u0275elementEnd();
  }
}
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const sol_r2 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      ctx_r0.eliminarRegistro(sol_r2);
      return \u0275\u0275resetView(ctx_r0.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 53);
    \u0275\u0275element(2, "path", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Eliminar ");
    \u0275\u0275elementEnd();
  }
}
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51)(1, "button", 57);
    \u0275\u0275listener("click", function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const sol_r2 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      ctx_r0.imprimirRegistro(sol_r2);
      return \u0275\u0275resetView(ctx_r0.closeMenu());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 53);
    \u0275\u0275element(3, "path", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Imprimir ");
    \u0275\u0275elementEnd()();
  }
}
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275conditionalCreate(1, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_1_Template, 4, 0, "button", 49);
    \u0275\u0275conditionalCreate(2, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_2_Template, 4, 0, "button", 50);
    \u0275\u0275conditionalCreate(3, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Conditional_3_Template, 5, 0, "div", 51);
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
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 39)(1, "button", 45);
    \u0275\u0275listener("click", function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const sol_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.toggleMenu(sol_r2.id, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 46);
    \u0275\u0275element(3, "path", 47);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(4, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Conditional_4_Template, 4, 3, "div", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sol_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.openMenuId === sol_r2.id ? 4 : -1);
  }
}
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "td", 21)(3, "div", 36);
    \u0275\u0275conditionalCreate(4, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_4_Template, 3, 1, "button", 37);
    \u0275\u0275conditionalCreate(5, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_5_Template, 3, 1, "button", 38);
    \u0275\u0275conditionalCreate(6, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Conditional_6_Template, 5, 1, "div", 39);
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
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
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
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 25)(1, "td", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 27);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 28);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 28);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 27);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 27);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 28);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 29);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 14);
    \u0275\u0275conditionalCreate(18, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_18_Template, 2, 0, "span", 30)(19, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_19_Template, 2, 0, "span", 31)(20, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_20_Template, 2, 0, "span", 32)(21, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_21_Template, 2, 0, "span", 33)(22, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_22_Template, 2, 1, "span", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(23, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_23_Template, 7, 5)(24, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Conditional_24_Template, 2, 2, "td", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sol_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("bg-amber-50", ctx_r0.editingRecordId === sol_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (ctx_r0.currentPage - 1) * ctx_r0.PAGE_SIZE + sol_r2["_flatIdx"] + 1, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldValue(sol_r2, "val_fecha_programacion"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.getFieldValue(sol_r2, "val_destino_direccion"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldValue(sol_r2, "val_destino_direccion"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.getFieldValue(sol_r2, "val_descripcion_actividad"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldValue(sol_r2, "val_descripcion_actividad"), " ");
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
    \u0275\u0275advance(2);
    \u0275\u0275conditional(sol_r2["ctestado_id"] === 388 ? 18 : sol_r2["ctestado_id"] === 2 ? 19 : sol_r2["ctestado_id"] === 387 ? 20 : sol_r2["ctestado_id"] === 51 ? 21 : 22);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.hasAnyAction ? 23 : 24);
  }
}
function HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(3, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_For_4_Template, 25, 15, "tr", 24, _forTrack12);
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
function HorariosLaboralesLista_Conditional_39_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, HorariosLaboralesLista_Conditional_39_Conditional_1_For_1_Template, 5, 2, null, null, _forTrack02);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r0.solicitudesAgrupadas);
  }
}
function HorariosLaboralesLista_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, HorariosLaboralesLista_Conditional_39_Conditional_0_Template, 3, 1, "tr")(1, HorariosLaboralesLista_Conditional_39_Conditional_1_Template, 2, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.solicitudesAgrupadas.length === 0 ? 0 : 1);
  }
}
function HorariosLaboralesLista_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275listener("click", function HorariosLaboralesLista_Conditional_41_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeMenu());
    });
    \u0275\u0275elementEnd();
  }
}
var ESTADO_AUTORIZADO = 387;
var ESTADO_RECHAZADO = 51;
var HorariosLaboralesLista = class _HorariosLaboralesLista {
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
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, "editar") : false;
  }, ...ngDevMode ? [{ debugName: "canEdit" }] : []);
  canDelete = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, "eliminar") : false;
  }, ...ngDevMode ? [{ debugName: "canDelete" }] : []);
  canAutorizar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, "autorizar") : false;
  }, ...ngDevMode ? [{ debugName: "canAutorizar" }] : []);
  canRechazar = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, "rechazar") : false;
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
      this.reportSolicitudService.getValoresByTipoFormulario(1002),
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
      await firstValueFrom(this.reportSolicitudService.eliminarVehiculo(record.id));
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
      title: "\xBFAutorizar programaci\xF3n?",
      text: "Se aprobar\xE1 la solicitud de veh\xEDculo seleccionada.",
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
        this.toastrAlert.showSuccess("Programaci\xF3n autorizada correctamente.", "\xA1Autorizado!");
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
      title: "Rechazar programaci\xF3n",
      text: `Se rechazar\xE1 la solicitud ${sol.num_secuencial ?? sol.id_solicitud}.`,
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
        this.toastrAlert.showWarning("Programaci\xF3n rechazada.", "Rechazado");
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
    a.download = "programacion-vehiculo.pdf";
    a.click();
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
      const fechaStr = String(sol["val_fecha_programacion"] ?? "\u2014");
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
  getFechaCreacion(record) {
    const raw = record["fecha_creacion"];
    if (!raw)
      return "\u2014";
    const d = new Date(raw);
    if (isNaN(d.getTime()))
      return String(raw);
    return d.toLocaleDateString("es-EC", { day: "2-digit", month: "2-digit", year: "numeric" });
  }
  static \u0275fac = function HorariosLaboralesLista_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HorariosLaboralesLista)(\u0275\u0275directiveInject(ReportSolicitudService), \u0275\u0275directiveInject(SolicitudService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ToastrAlertService), \u0275\u0275directiveInject(DomSanitizer));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HorariosLaboralesLista, selectors: [["app-horarios-laborales-lista"]], inputs: { formularioId: "formularioId", fields: "fields", editingRecordId: "editingRecordId" }, outputs: { editar: "editar" }, features: [\u0275\u0275NgOnChangesFeature], decls: 43, vars: 13, consts: [[1, "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200", "overflow-hidden"], [1, "overflow-x-auto", "custom-scroll"], [1, "w-full", "text-sm", "border-collapse", "table-fixed"], [1, "w-[38px]"], [1, "w-[88px]"], [1, "w-[130px]"], [1, "w-[115px]"], [1, "w-[58px]"], [1, "w-[105px]"], [1, "w-[62px]"], [1, "w-[100px]"], [1, "w-[95px]"], [1, "w-[122px]"], [1, "bg-slate-50", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "border-b", "border-slate-200", "tracking-wider"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-left"], [1, "px-3", "py-2.5", "text-left"], ["appTableSkeleton", "", 3, "rows", "cols", "actionButtons"], ["itemLabel", "registros", 3, "pageChange", "meta", "currentPage", "itemsShown"], [1, "fixed", "inset-0", "z-40"], ["titulo", "Programaci\xF3n de Veh\xEDculo", 3, "closed", "downloaded", "visible", "loading", "pdfUrl"], [1, "px-2", "py-2.5", "text-center"], [1, "p-10", "text-slate-400", "italic", "text-center"], [1, "py-3", "px-4", "text-center", "font-bold", "italic", "text-[#1e3a8a]", "bg-blue-50/40", "border-y", "border-slate-200", "text-sm", "tracking-widest", "uppercase"], [1, "border-b", "border-slate-200", "hover:bg-slate-50", "transition-colors", 3, "bg-amber-50"], [1, "border-b", "border-slate-200", "hover:bg-slate-50", "transition-colors"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center", "font-mono", "text-slate-400", "text-xs"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center", "text-slate-500", "whitespace-nowrap", "text-xs"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-slate-600", "truncate", 3, "title"], [1, "px-3", "py-2.5", "border-r", "border-slate-100", "text-center", "text-slate-600"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-blue-400", "text-blue-700", "font-bold", "text-[10px]", "rounded", "bg-blue-50"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-amber-400", "text-amber-700", "font-bold", "text-[10px]", "rounded", "bg-amber-50"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-green-400", "text-green-700", "font-bold", "text-[10px]", "rounded", "bg-green-50"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-red-400", "text-red-700", "font-bold", "text-[10px]", "rounded", "bg-red-50"], [1, "block", "w-full", "text-center", "py-0.5", "border", "border-slate-300", "text-slate-500", "font-bold", "text-[10px]", "rounded", "bg-slate-50"], [1, "px-3", "py-2.5", "text-slate-600", "truncate", 3, "title"], [1, "flex", "items-center", "justify-center", "gap-1.5"], ["type", "button", "title", "Autorizar", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-green-400", "text-green-700", "bg-green-50", "hover:bg-green-100", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", "shrink-0", 3, "disabled"], ["type", "button", "title", "Rechazar", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-red-300", "text-red-600", "bg-red-50", "hover:bg-red-100", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", "shrink-0", 3, "disabled"], [1, "relative"], ["type", "button", "title", "Autorizar", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-green-400", "text-green-700", "bg-green-50", "hover:bg-green-100", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", "shrink-0", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], ["type", "button", "title", "Rechazar", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-red-300", "text-red-600", "bg-red-50", "hover:bg-red-100", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", "shrink-0", 3, "click", "disabled"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"], ["type", "button", "title", "M\xE1s acciones", 1, "h-8", "w-8", "flex", "items-center", "justify-center", "rounded", "border", "border-slate-300", "text-slate-500", "bg-white", "hover:bg-slate-100", "transition-colors", "shrink-0", 3, "click"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "h-4", "w-4"], ["d", "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"], [1, "absolute", "right-0", "top-full", "mt-1", "z-50", "bg-white", "border", "border-slate-200", "rounded-lg", "shadow-lg", "py-1", "w-40"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-red-600", "hover:bg-red-50"], [1, "border-t", "border-slate-100", "mt-1", "pt-1"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-amber-700", "hover:bg-amber-50", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-3.5", "w-3.5", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-red-600", "hover:bg-red-50", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], ["type", "button", 1, "w-full", "flex", "items-center", "gap-2.5", "px-3", "py-2", "text-xs", "text-slate-600", "hover:bg-slate-50", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"], [1, "fixed", "inset-0", "z-40", 3, "click"]], template: function HorariosLaboralesLista_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "table", 2)(3, "colgroup");
      \u0275\u0275element(4, "col", 3)(5, "col", 4)(6, "col", 5)(7, "col", 6)(8, "col", 7)(9, "col", 7)(10, "col", 8)(11, "col", 9)(12, "col", 10)(13, "col", 11);
      \u0275\u0275conditionalCreate(14, HorariosLaboralesLista_Conditional_14_Template, 1, 0, "col", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "thead")(16, "tr", 13)(17, "th", 14);
      \u0275\u0275text(18, "No.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "th", 14);
      \u0275\u0275text(20, "Fecha");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "th", 15);
      \u0275\u0275text(22, "Sector / Destino");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "th", 15);
      \u0275\u0275text(24, "Actividad");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "th", 14);
      \u0275\u0275text(26, "Salida");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "th", 14);
      \u0275\u0275text(28, "Retorno");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "th", 15);
      \u0275\u0275text(30, "Funcionario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "th", 14);
      \u0275\u0275text(32, "Ocupantes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "th", 14);
      \u0275\u0275text(34, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(35, HorariosLaboralesLista_Conditional_35_Template, 4, 0)(36, HorariosLaboralesLista_Conditional_36_Template, 2, 0, "th", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(37, "tbody", 17);
      \u0275\u0275elementStart(38, "tbody");
      \u0275\u0275conditionalCreate(39, HorariosLaboralesLista_Conditional_39_Template, 2, 1);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(40, "app-pagination", 18);
      \u0275\u0275listener("pageChange", function HorariosLaboralesLista_Template_app_pagination_pageChange_40_listener($event) {
        return ctx.irAPagina($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(41, HorariosLaboralesLista_Conditional_41_Template, 1, 0, "div", 19);
      \u0275\u0275elementStart(42, "app-pdf-viewer", 20);
      \u0275\u0275listener("closed", function HorariosLaboralesLista_Template_app_pdf_viewer_closed_42_listener() {
        return ctx.cerrarPdf();
      })("downloaded", function HorariosLaboralesLista_Template_app_pdf_viewer_downloaded_42_listener() {
        return ctx.descargarPdf();
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275conditional(ctx.hasAnyAction ? 14 : -1);
      \u0275\u0275advance(21);
      \u0275\u0275conditional(ctx.hasAnyAction ? 35 : 36);
      \u0275\u0275advance(2);
      \u0275\u0275property("rows", ctx.loadingTabla ? 8 : 0)("cols", ctx.hasAnyAction ? 10 : 9)("actionButtons", ctx.hasAnyAction ? 2 : 0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.loadingTabla ? 39 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("meta", ctx.metaTabla)("currentPage", ctx.currentPage)("itemsShown", ctx.solicitudes.length);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.openMenuId !== null ? 41 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("visible", ctx.showPdfModal)("loading", ctx.isPdfCargando)("pdfUrl", ctx.pdfPreviewUrl);
    }
  }, dependencies: [CommonModule, PaginationComponent, PdfViewerComponent, TableSkeleton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HorariosLaboralesLista, [{
    type: Component,
    args: [{ selector: "app-horarios-laborales-lista", imports: [CommonModule, PaginationComponent, PdfViewerComponent, TableSkeleton], template: `<div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
  <div class="overflow-x-auto custom-scroll">
    <table class="w-full text-sm border-collapse table-fixed">
      <colgroup>
        <col class="w-[38px]">
        <col class="w-[88px]">
        <col class="w-[130px]">
        <col class="w-[115px]">
        <col class="w-[58px]">
        <col class="w-[58px]">
        <col class="w-[105px]">
        <col class="w-[62px]">
        <col class="w-[100px]">
        <col class="w-[95px]">
        @if (hasAnyAction) {
          <col class="w-[122px]">
        }
      </colgroup>

      <thead>
        <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
          <th class="px-3 py-2.5 border-r border-slate-100 text-center">No.</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-center">Fecha</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-left">Sector / Destino</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-left">Actividad</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-center">Salida</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-center">Retorno</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-left">Funcionario</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-center">Ocupantes</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-center">Estado</th>
          @if (hasAnyAction) {
            <th class="px-3 py-2.5 border-r border-slate-100 text-left">Observaciones</th>
            <th class="px-2 py-2.5 text-center">Acciones</th>
          } @else {
            <th class="px-3 py-2.5 text-left">Observaciones</th>
          }
        </tr>
      </thead>

      <tbody appTableSkeleton [rows]="loadingTabla ? 8 : 0" [cols]="hasAnyAction ? 10 : 9" [actionButtons]="hasAnyAction ? 2 : 0"></tbody>
      <tbody>
        @if (!loadingTabla) {
          @if (solicitudesAgrupadas.length === 0) {
            <tr>
              <td [attr.colspan]="hasAnyAction ? 11 : 10" class="p-10 text-slate-400 italic text-center">
                No hay veh\xEDculos programados.
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
                    {{ getFieldValue(sol, 'val_fecha_programacion') }}
                  </td>
                  <td class="px-3 py-2.5 border-r border-slate-100 text-slate-600 truncate"
                      [title]="$any(getFieldValue(sol, 'val_destino_direccion'))">
                    {{ getFieldValue(sol, 'val_destino_direccion') }}
                  </td>
                  <td class="px-3 py-2.5 border-r border-slate-100 text-slate-600 truncate"
                      [title]="$any(getFieldValue(sol, 'val_descripcion_actividad'))">
                    {{ getFieldValue(sol, 'val_descripcion_actividad') }}
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
  titulo="Programaci\xF3n de Veh\xEDculo"
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HorariosLaboralesLista, { className: "HorariosLaboralesLista", filePath: "src/app/features/horarios-laborales/lista/horarios-laborales-lista.ts", lineNumber: 33 });
})();

// src/app/features/horarios-laborales/horarios-laborales.ts
var HorariosLaborales = class _HorariosLaborales {
  authService;
  reportFormularioService;
  listaRef;
  editingRecord = null;
  formularioNombre = "Solicitud de transporte";
  fields = [];
  formularioId = null;
  formulario = null;
  fechaEmision = null;
  destroy$ = new Subject();
  userAppRole = computed(() => {
    const roles = this.authService.userProfile()?.roles ?? [];
    return Object.values(AppRole).find((r) => roles.includes(r)) ?? null;
  }, ...ngDevMode ? [{ debugName: "userAppRole" }] : []);
  canCreate = computed(() => {
    const role = this.userAppRole();
    return role ? hasPermission(MenuKey.HORARIOS_LABORALES, role, "crear") : false;
  }, ...ngDevMode ? [{ debugName: "canCreate" }] : []);
  constructor(authService, reportFormularioService) {
    this.authService = authService;
    this.reportFormularioService = reportFormularioService;
  }
  ngOnInit() {
    this.reportFormularioService.getFormularioByCTId(1002).pipe(takeUntil(this.destroy$)).subscribe({
      next: (formulario) => {
        this.formulario = formulario;
        if (formulario?.fecha_emision) {
          this.fechaEmision = new Date(Number(formulario.fecha_emision));
        }
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
  static \u0275fac = function HorariosLaborales_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HorariosLaborales)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ReportFormularioService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HorariosLaborales, selectors: [["app-horarios-laborales"]], viewQuery: function HorariosLaborales_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(HorariosLaboralesLista, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listaRef = _t.first);
    }
  }, decls: 6, vars: 8, consts: [[1, "p-6", "bg-slate-50", "min-h-screen", "text-slate-700", "font-sans", "pb-24"], [1, "max-w-7xl", "mx-auto"], [1, "animate-in", "fade-in"], ["breadcrumbSection", "Gesti\xF3n de Veh\xEDculos", "subtitle", "Complete la siguiente informaci\xF3n para solicitar un veh\xEDculo de la DMRCA", 3, "title", "codigoFormulario", "edicion", "fechaSolicitud"], [3, "formularioReady", "guardado", "cancelado", "editingRecord"], [3, "editar", "formularioId", "fields", "editingRecordId"]], template: function HorariosLaborales_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "app-page-header", 3);
      \u0275\u0275elementStart(4, "app-horarios-laborales-formulario", 4);
      \u0275\u0275listener("formularioReady", function HorariosLaborales_Template_app_horarios_laborales_formulario_formularioReady_4_listener($event) {
        return ctx.onFormularioReady($event);
      })("guardado", function HorariosLaborales_Template_app_horarios_laborales_formulario_guardado_4_listener() {
        return ctx.onGuardado();
      })("cancelado", function HorariosLaborales_Template_app_horarios_laborales_formulario_cancelado_4_listener() {
        return ctx.onCancelado();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "app-horarios-laborales-lista", 5);
      \u0275\u0275listener("editar", function HorariosLaborales_Template_app_horarios_laborales_lista_editar_5_listener($event) {
        return ctx.onEditar($event);
      });
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("title", ctx.formularioNombre)("codigoFormulario", (ctx.formulario == null ? null : ctx.formulario.descripcion) ?? null)("edicion", (ctx.formulario == null ? null : ctx.formulario.version) ?? null)("fechaSolicitud", ctx.fechaEmision);
      \u0275\u0275advance();
      \u0275\u0275property("editingRecord", ctx.editingRecord);
      \u0275\u0275advance();
      \u0275\u0275property("formularioId", ctx.formularioId)("fields", ctx.fields)("editingRecordId", (ctx.editingRecord == null ? null : ctx.editingRecord.id) ?? null);
    }
  }, dependencies: [CommonModule, PageHeader, HorariosLaboralesFormulario, HorariosLaboralesLista], styles: ["\n\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_animateIn 0.3s ease-out forwards;\n}\n.fade-in[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.slide-in-from-bottom-4[_ngcontent-%COMP%] {\n  transform: translateY(1rem);\n}\n.slide-in-from-right-4[_ngcontent-%COMP%] {\n  transform: translateX(1rem);\n}\n@keyframes _ngcontent-%COMP%_animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus, \ntextarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=horarios-laborales.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HorariosLaborales, [{
    type: Component,
    args: [{ selector: "app-horarios-laborales", standalone: true, imports: [CommonModule, PageHeader, HorariosLaboralesFormulario, HorariosLaboralesLista], template: '<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">\n  <div class="max-w-7xl mx-auto">\n    <div class="animate-in fade-in">\n\n      <app-page-header\n        breadcrumbSection="Gesti\xF3n de Veh\xEDculos"\n        [title]="formularioNombre"\n        subtitle="Complete la siguiente informaci\xF3n para solicitar un veh\xEDculo de la DMRCA"\n        [codigoFormulario]="formulario?.descripcion ?? null"\n        [edicion]="formulario?.version ?? null"\n        [fechaSolicitud]="fechaEmision"\n      />\n\n      <app-horarios-laborales-formulario\n        [editingRecord]="editingRecord"\n        (formularioReady)="onFormularioReady($event)"\n        (guardado)="onGuardado()"\n        (cancelado)="onCancelado()"\n      />\n\n      <app-horarios-laborales-lista\n        [formularioId]="formularioId"\n        [fields]="fields"\n        [editingRecordId]="editingRecord?.id ?? null"\n        (editar)="onEditar($event)"\n      />\n\n    </div>\n  </div>\n</div>\n', styles: ["/* src/app/features/horarios-laborales/horarios-laborales.css */\n.animate-in {\n  animation: animateIn 0.3s ease-out forwards;\n}\n.fade-in {\n  opacity: 0;\n}\n.slide-in-from-bottom-4 {\n  transform: translateY(1rem);\n}\n.slide-in-from-right-4 {\n  transform: translateX(1rem);\n}\n@keyframes animateIn {\n  to {\n    opacity: 1;\n    transform: translate(0);\n  }\n}\n.custom-scroll::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scroll::-webkit-scrollbar-track {\n  background: #f1f5f9;\n  border-radius: 4px;\n}\n.custom-scroll::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 4px;\n}\n.custom-scroll::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\ninput:focus,\nselect:focus,\ntextarea:focus {\n  outline: none;\n  border-color: #1e3a8a;\n  box-shadow: 0 0 0 1px #1e3a8a;\n}\n/*# sourceMappingURL=horarios-laborales.css.map */\n"] }]
  }], () => [{ type: AuthService }, { type: ReportFormularioService }], { listaRef: [{
    type: ViewChild,
    args: [HorariosLaboralesLista]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HorariosLaborales, { className: "HorariosLaborales", filePath: "src/app/features/horarios-laborales/horarios-laborales.ts", lineNumber: 24 });
})();
export {
  HorariosLaborales
};
//# sourceMappingURL=chunk-7DIQHEDQ.js.map
