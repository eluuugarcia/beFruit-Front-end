var app = angular.module("app", []);
app.controller("beFruitController", function ($scope, $http) {

    $scope.title = "HOLAAAAAAAAAA";
    $scope.accion = 'Inicio';


    $scope.Inicio = function () {
        $scope.accion = 'Inicio';

    };

    $scope.Venta = function () {
        $scope.accion = 'Venta';
    };

    $scope.Stock = function () {
        $scope.accion = 'Stock';

    };

    $scope.Caja = function () {
        $scope.accion = 'Caja';
    };

    $scope.Empleados = function () {
        $scope.accion = 'Empleados';
    };

    $scope.Informes = function () {
        $scope.accion = 'Informes';
    };

    $scope.Promociones = function () {
        $scope.accion = 'Promociones';
    };

    $scope.Franquicias = function () {
        $scope.accion = 'Franquicias';
    };

    $scope.Configuracion = function () {
        $scope.accion = 'Configuracion';
    };


});

app.controller("stockController", function ($scope, $http) {

    $scope.subaccion = 'Stock1';

    //Subacciones...

    $scope.Stock1 = function () {
        $scope.subaccion = 'Stock1';

    };

    $scope.Stock2 = function () {
        $scope.subaccion = 'Stock2';
        $scope.movimientos = $scope.obtenerMovimientos();

    };

    $scope.Stock3 = function () {
        $scope.subaccion = 'Stock3';
        $scope.tempDetalles = [];
    };


    $scope.Stock4 = function () {
        $scope.subaccion = 'Stock4';
    };

    $scope.Stock5 = function () {
        $scope.subaccion = 'Stock5';
    };

    //Funciones...

    $scope.obtenerInsumos = function () {
        //Harcodeado para pruebas:
        /*var datos = [{
            "idInsumo": "1",
            "nombre": "Diego",
            "cantidadStock": "10",
            "stockMinimo": "5",
            "UnidadMedida": {"nombre": "unidad"}
        },
            {
                "idInsumo": "2",
                "nombre": "Servilletas",
                "cantidadStock": "10",
                "stockMinimo": "5",
                "UnidadMedida": {"nombre": "unidad"}
            },
            {
                "idInsumo": "3",
                "nombre": "Cucharitas",
                "cantidadStock": "10",
                "stockMinimo": "5",
                "UnidadMedida": {"nombre": "unidad"}
            },
            {
                "idInsumo": "5",
                "nombre": "Vasos 400gr",
                "cantidadStock": "10",
                "stockMinimo": "5",
                "UnidadMedida": {"nombre": "unidad"}
            }];
        return datos;*/
        $http.get('/beFruit/stock/insumo')
            .then (function (response){
                return response.data;
            });

    };

    $scope.obtenerMovimientos = function () {
        $http.get("/beFruit/stock/movimientoStock").then(function (response) {
            var datos = response.data;
        });
        //Harcodeado para pruebas:
        /*var datos = [{
            "id": "1", "fechaHora": "25/05/18 - 18:09", "fechaHoraAnulacion": null, "entrada": true,
            "detalles": [{
                "idDetalleMovimientoStock": "11",
                "idMovimiento": "1",
                "insumo": {"idInsumo": "1", "nombre": "Cucharas", "UnidadMedida": {"nombre": "unidad"}},
                "cantidad": "100"
            },
                {
                    "idDetalleMovimientoStock": "12",
                    "idMovimiento": "2",
                    "insumo": {"idInsumo": "2", "nombre": "Servilletas", "UnidadMedida": {"nombre": "unidad"}},
                    "cantidad": "280"
                }]
        },
            {
                "id": "2", "fechaHora": "29/05/18 - 16:29", "fechaHoraAnulacion": null, "entrada": true,
                "detalles": [{
                    "idDetalleMovimientoStock": "21",
                    "idMovimiento": "2",
                    "insumo": {"idInsumo": "3", "nombre": "Vasos 500gr", "UnidadMedida": {"nombre": "unidad"}},
                    "cantidad": "250"
                },
                    {
                        "idDetalleMovimientoStock": "22",
                        "idMovimiento": "2",
                        "insumo": {"idInsumo": "4", "nombre": "Vasos 400gr", "UnidadMedida": {"nombre": "unidad"}},
                        "cantidad": "250"
                    }]
            },
            {
                "id": "3", "fechaHora": "09/06/18 - 19:00", "fechaHoraAnulacion": null, "entrada": false,
                "detalles": [{
                    "idDetalleMovimientoStock": "31",
                    "idMovimiento": "3",
                    "insumo": {"idInsumo": "5", "nombre": "Bananas", "UnidadMedida": {"nombre": "unidad"}},
                    "cantidad": "6"
                },
                    {
                        "idDetalleMovimientoStock": "32",
                        "idMovimiento": "3",
                        "insumo": {"idInsumo": "6", "nombre": "Oreos", "UnidadMedida": {"nombre": "paquetes"}},
                        "cantidad": "2"
                    },
                    {
                        "idDetalleMovimientoStock": "33",
                        "idMovimiento": "3",
                        "insumo": {"idInsumo": "7", "nombre": "Salsa Chocolate", "UnidadMedida": {"nombre": "botella"}},
                        "cantidad": "1"
                    }]
            }];*/
        var movs = [];
        angular.forEach(datos, function (movimiento) {
            if (movimiento.fechaHoraAnulacion == null) {
                var tipo = "Salida";
                if (movimiento.entrada == true) {
                    tipo = "Entrada";
                }
                ;
                angular.forEach(movimiento.detalles, function (detalle) {
                    var cant = detalle.cantidad + " " + detalle.insumo.UnidadMedida.nombre;
                    detalle.cantidad = cant;
                });
                var mov = {
                    "id": movimiento.id,
                    "fechaHora": movimiento.fechaHora,
                    "tipo": tipo,
                    "detalles": movimiento.detalles
                };
                movs.push(mov);
            }
            ;
        });
        return movs;
    };

    $scope.anularMovimiento = function (m) {
        if (confirm("¿Desea anular el movimiento " + m.id + "?") == true) {
            $http.delete("/beFruit/stock/movimientoStock", m.id).then(
                function (response) {
                    alert("Movimiento anulado exitosamente");
                    $scope.obtenerMovimientos();
                },
                function (response) {
                    alert("No se puedo anular el movimiento...");
                })
        }
        ;

    };

    $scope.verDetalles = function (m) {
        $scope.detalles = m.detalles;
    };


    $scope.sumarDetalle = function (m, d) {
        if ((d.insumo != null) && (d.cantidad != null) && (d.cantidad >= 1)) {
            d.idMovimiento = m.id;
            d.insumo = $scope.detalle.insumo;
            $scope.tempDetalles.push(d);
            $scope.detalle = {};
        } else {
            alert("Faltan datos...");
        }
        ;


    };

    $scope.restarDetalle = function (index) {
        $scope.tempDetalles.splice(index, 1);

    };

    $scope.cancelarMovimiento = function () {
        $scope.tempDetalles = [];
        $scope.detalle = {};
        $scope.movimiento = {};

    };

    $scope.agregarMovimiento = function () {
        var count = 1;
        var detalles = [];
        angular.forEach($scope.tempDetalles, function (det) {
            det.idMovimiento = $scope.movimiento.id;
            det.idDetalleMovimientoStock = count;
            detalles.push(det);
        });
        $scope.CurrentDate = new Date();
        var mov = {
            "id": $scope.movimiento.id,
            "idVenta": null,
            "idTurno": null,
            "fechaHora": $scope.CurrentDate,
            "fechaHoraAnulacion": null,
            "entrada": $scope.movimiento.tipo,
            "detalles": detalles
        };
        $http.post("/beFruit/stock/movimientoStock", mov).then(function (response) {
                $http.post("/beFruit/stock/detalleMovimientoStock", detalles, mov.id).then(function (response) {
                    alert("Movimiento agregado");

                });

            },
            function (response) {
                alert("No se puedo agregar el movimiento...");
            });
        $scope.tempDetalles = [];
        $scope.detalle = {};
        $scope.movimiento = {};


    };

    $scope.obtenerUnidades = function () {
        $http.get('/beFruit/stock/unidadMedida')
            .then(function (response) {
                var datos = response.data;
                return datos;
            });
    };

    $scope.grabarInsumo = function () {
        if ($scope.nvoInsumo.idInsumo == undefined)  // agregar
        {
            $http.post('/application/json', $scope.nvoInsumo).then(function (response) {
                alert("Registro agregado correctamente.");
                $scope.Stock1();
                $scope.nvoInsumo = null;

            });
        }
        else {
            $http.put('/' + $scope.nvoInsumo.idInsumo, $scope.nvoInsumo).then(function (response) {
                alert("Registro modificado correctamente.");
                $scope.Stock1();
                $scope.nvoInsumo = null;
            });
        }
    };

    $scope.borrarInsumo = function () {

        $http.put('/' + $scope.nvoInsumo.idInsumo, $scope.nvoInsumotoJson).then(function (response) {

            alert("Registro eliminado")
        });

    };

    $scope.buscarInsumoPorId = function (Insumo) {
        $scope.nvoInsumo = Insumo;
        $scope.Stock4();
    };

    $scope.buscarUnidadMedidaPorId = function (unidadMedida) {
        $scope.nvoUnidad = unidadMedida;
    };


    //Valores inicializados (sino materialize no carga los select):

    $scope.insumos = $scope.obtenerInsumos();
    $scope.unidades = $scope.obtenerUnidades();
    $scope.nvoInsumo = $scope.nvoInsumo;


});


app.controller("franquiciasController", function ($scope, $http) {

    $scope.subaccion = 'Franquicias1';

    //Subacciones...

    $scope.Franquicias1 = function () {
        $scope.subaccion = 'Franquicias1';

    };

    $scope.Franquicias2 = function () {
        $scope.subaccion = 'Franquicias2';

    };

    //Funciones...

});

app.controller("ventaController", function ($scope, $http) {
});

app.controller("cajaController", function ($scope, $http) {
});

app.controller("empleadosController", function ($scope, $http) {
});

app.controller("informesController", function ($scope, $http) {
});

app.controller("promocionesController", function ($scope, $http) {
});

app.controller("configController", function ($scope, $http) {
});
