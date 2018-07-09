var app = angular.module("app", []);
app.controller("beFruitController", function ($scope, $http) {

    $scope.title = "HOLAAAAAAAAAA";
    $scope.accion = 'Inicio'; 
    $scope.subaccion = ''; 
    
    
    //Accion...
    
    $scope.Inicio = function () {
        $scope.accion = 'Inicio'; 
    };
    
    $scope.Venta = function () {
        $scope.accion = 'Venta'; 
    };
    
    $scope.Stock = function () {
        $scope.accion = 'Stock'; 
        $scope.subaccion = 'Stock1'; 
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
    
    $scope.Sucursales = function () {
        $scope.accion = 'Sucursales'; 
    };
    
    $scope.Configuracion = function () {
        $scope.accion = 'Configuracion'; 
    };
    
    //Subacciones...
    
    $scope.Stock1= function () { 
        $scope.subaccion = 'Stock1'; 
    };
    
    $scope.Stock2 = function () { 
        $scope.subaccion = 'Stock2'; 
    };
    
    $scope.Stock3 = function () { 
        $scope.subaccion = 'Stock3'; 
    };
    
    $scope.Stock4 = function () { 
        $scope.subaccion = 'Stock4'; 
    };
    

});


