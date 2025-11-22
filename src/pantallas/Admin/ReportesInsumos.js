import React from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";

import * as Print from "expo-print";
import styles from "../../estilos/reporteInsumos.style";

import { db } from "../../servicios/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ReportesInsumos({ navigation }) {

  const obtenerDatosInsumos = async () => {
    try {
      const snap = await getDocs(collection(db, "inventario_gestion_7"));
      let resultado = [];

      snap.docs.forEach((doc) => {
        const d = doc.data();
        const nombre = d.nombre || "Sin nombre";

        if (Array.isArray(d.unidades)) {
          d.unidades.forEach((u) => {
            resultado.push({
              nombre,
              unidad: u.unidad,
              cantidad: Number(u.stock),
              minimo: 5,
            });
          });
        }
      });

      return resultado;

    } catch (error) {
      console.log(" FIRESTORE ERROR:", error);
      Alert.alert("Error", "No se pudo obtener la información del inventario.");
      return [];
    }
  };

  const generarPDF = async (tipo) => {
    try {
      const fechaLarga = new Date().toLocaleDateString('es-CL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const hora = new Date().toLocaleTimeString("es-CL");

      const datos = await obtenerDatosInsumos();

      const totalInsumos = datos.length;

      const totalBajoStock = datos.filter(i => i.cantidad <= 15).length;

      const filasTabla = datos.map(item => {

        const colorEstado =
          item.cantidad > 50 ? "#4caf50"
          : item.cantidad > 15 ? "#ffb84d"
          : "#ff4d4d";

        const textoEstado =
          item.cantidad > 50 ? "Bueno"
          : item.cantidad > 15 ? "Medio"
          : "Crítico";

        return `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">
              ${item.nombre}
            </td>

            <td style="padding: 10px; text-align:center; border-bottom: 1px solid #ddd;">
              ${item.unidad}
            </td>

            <td style="padding: 10px; text-align:center; border-bottom: 1px solid #ddd; font-weight:bold;">
              ${item.cantidad}
            </td>

            <td style="padding: 10px; text-align:center; border-bottom: 1px solid #ddd;">
              ${item.minimo}
            </td>

            <td style="padding: 10px; text-align:center; border-bottom: 1px solid #ddd; color:${colorEstado}; font-weight:bold;">
              ${textoEstado}
            </td>
          </tr>
        `;
      }).join("");

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 30px;
              background-color: #fffaf5;
            }

            .header {
              text-align: center;
              border-bottom: 4px solid #e85d2e;
              padding-bottom: 15px;
              margin-bottom: 20px;
            }

            .logo {
              font-size: 34px;
              font-weight: bold;
              color: #e85d2e;
            }

            .titulo {
              font-size: 22px;
              margin-top: 10px;
              font-weight: bold;
              color: #3c3c3c;
            }

            .info-box {
              background: #fff5ee;
              padding: 20px;
              border-radius: 10px;
              border-left: 5px solid #e85d2e;
              margin-bottom: 30px;
              font-size: 15px;
            }

            .stats {
              display: flex;
              justify-content: space-between;
              margin-bottom: 25px;
            }

            .stat-card {
              background: white;
              padding: 20px;
              border-radius: 10px;
              width: 30%;
              text-align: center;
              border-top: 4px solid #e85d2e;
              box-shadow: 0 2px 5px rgba(0,0,0,0.15);
            }

            .stat-card .numero {
              font-size: 32px;
              font-weight: bold;
              margin-bottom: 5px;
              color: #e85d2e;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              background: white;
              border-radius: 10px;
              overflow: hidden;
              margin-top: 20px;
            }

            th {
              background: #e85d2e;
              color: white;
              padding: 12px;
              text-align: center;
              font-size: 14px;
            }

            td {
              padding: 10px;
              border-bottom: 1px solid #ddd;
              font-size: 13px;
            }

            tr:nth-child(even) {
              background: #fafafa;
            }

            .footer {
              text-align: center;
              margin-top: 40px;
              font-size: 12px;
              color: #777;
              padding-top: 10px;
              border-top: 1px solid #ddd;
            }
          </style>
        </head>

        <body>

          <div class="header">
            <div class="logo">LAVANDERÍA DEL COBRE</div>
            <div class="titulo">Reporte ${tipo === "semanal" ? "Semanal" : "Mensual"} de Insumos</div>
          </div>

          <div class="info-box">
            <p><strong> Fecha de generación:</strong> ${fechaLarga}</p>
            <p><strong> Hora:</strong> ${hora}</p>
            <p><strong> Total de insumos:</strong> ${totalInsumos}</p>
            <p><strong> En bajo stock:</strong> ${totalBajoStock}</p>
          </div>

          <div class="stats">
            <div class="stat-card">
              <div class="numero">${totalInsumos}</div>
              <div>Total de Insumos</div>
            </div>

            <div class="stat-card">
              <div class="numero" style="color:${totalBajoStock > 0 ? '#dc3545' : '#28a745'}">
                ${totalBajoStock}
              </div>
              <div>Bajo Stock</div>
            </div>

            <div class="stat-card">
              <div class="numero" style="color:#e85d2e;">
                ${totalInsumos - totalBajoStock}
              </div>
              <div>En Buen Estado</div>
            </div>
          </div>

          <h3 style="color:#e85d2e; border-bottom:2px solid #e85d2e; padding-bottom:5px;">
             Inventario Detallado
          </h3>

          <table>
            <thead>
              <tr>
                <th>Insumo</th>
                <th>Unidad</th>
                <th>Stock</th>
                <th>Mínimo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${filasTabla}
            </tbody>
          </table>

          <div class="footer">
            Lavandería del Cobre — Reporte generado automáticamente
          </div>

        </body>
        </html>
      `;

      if (Platform.OS === "web") {
        const win = window.open("", "_blank");
        win.document.write(html);
        win.document.close();
        win.print();
        return;
      }

      await Print.printAsync({ html });

    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo generar el PDF.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Reportes de Insumos</Text>
      <Text style={styles.subtitulo}>Genera reportes PDF del inventario</Text>

      <TouchableOpacity
        style={[styles.boton, styles.botonSemanal]}
        onPress={() => generarPDF("semanal")}
      >
        <Text style={styles.textoBoton}>Reporte Semanal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.boton, styles.botonMensual]}
        onPress={() => generarPDF("mensual")}
      >
        <Text style={styles.textoBoton}>Reporte Mensual</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoVolver}>← Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
