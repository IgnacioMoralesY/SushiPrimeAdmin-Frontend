import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';

export const DataSetAsistencia = (listAsistencia) => {
    const dataSet = [
        {
            columns: ["Tienda","Rut","Nombre","Apellido", "Día Entrada", "Hora Entrada", "Día Salida" , "Hora Salida", "Horas Trabajadas"],
            data: listAsistencia.map(asistencia => {
                let fechaEntrada = moment(asistencia.fecha_entrada).format('DD/MM/YYYY');
                let horaEntrada = moment(asistencia.fecha_entrada).format('HH:mm');

                let fechaSalida = " - ";
                let horaSalida = " - ";
                let diferenciaHoras = " - ";

                if(asistencia.fecha_salida != null && asistencia.fecha_salida != undefined){
                    fechaSalida = moment(asistencia.fecha_salida).format('DD/MM/YYYY');
                    horaSalida = moment(asistencia.fecha_salida).format('HH:mm');

                    diferenciaHoras = moment(asistencia.fecha_salida).diff(moment(asistencia.fecha_entrada), "hours");
                }
                
                return [
                    { value: asistencia.tienda.nombre, style: { font: { sz: "14" }}},
                    { value: asistencia.usuario.rut, style: { font: { sz: "14" }}},
                    { value: asistencia.usuario.nombre, style: { font: { sz: "14" }}},
                    { value: asistencia.usuario.apellido, style: { font: { sz: "14" }}},
                    { value: fechaEntrada, style: { font: { sz: "14" }}},
                    { value: horaEntrada, style: { font: { sz: "14" }}},
                    { value: fechaSalida, style: { font: { sz: "14" }}},
                    { value: horaSalida, style: { font: { sz: "14" }}},
                    { value: diferenciaHoras+"", style: { font: { sz: "14" }}}
                ]
            })
        }
    ];
    
    return dataSet;
};