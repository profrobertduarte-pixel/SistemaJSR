let cedulaEditar = "";

function abrirFormularioUsuario(){
    let modal = document.getElementById("formularioUsuario");
    modal.classList.remove("cerrar");
    modal.classList.add("abrir");
}

function cerrarFormularioUsuario(){
    let modal = document.getElementById("formularioUsuario");
    modal.classList.remove("abrir");
    modal.classList.add("cerrar");
    setTimeout(() => { modal.style.display = "none"; }, 300);
}

function guardarUsuario(){
    let nombres = document.getElementById("nombres").value.trim();
    let cedula = document.getElementById("cedula").value.trim();
    let barrio = document.getElementById("barrio").value.trim();
    let casa = document.getElementById("casa").value.trim();
    let manzana = document.getElementById("manzana").value.trim();
    let lote = document.getElementById("lote").value.trim();
    let anio = document.getElementById("anio").value.trim();

    if(!nombres || !cedula || !barrio || !casa || !manzana || !lote || !anio){
        alert("Complete todos los campos");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if(usuarios.find(u => u.cedula === cedula)){
        alert("❌ Este usuario ya existe");
        return;
    }

    usuarios.push({ nombres, cedula, barrio, casa, manzana, lote, anio });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("✅ Usuario guardado correctamente");
    cerrarFormularioUsuario();
    mostrarUsuarios();
}

function abrirFormularioPago(){
    let modal = document.getElementById("formularioPago");
    modal.classList.remove("cerrar");
    modal.classList.add("abrir");
}

function cerrarFormularioPago(){
    let modal = document.getElementById("formularioPago");
    modal.classList.remove("abrir");
    modal.classList.add("cerrar");
    setTimeout(() => { modal.style.display = "none"; }, 300);
}

function mostrarUsuarios(){
    document.getElementById("listaUsuarios").classList.remove("cerrar");
    document.getElementById("listaUsuarios").classList.add("abrir");

    let usuariosDiv = document.getElementById("usuarios");
    usuariosDiv.innerHTML = "";
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.forEach(u => {
        usuariosDiv.innerHTML += `
<p>
<b>${u.nombres}</b> | ${u.cedula} | ${u.barrio} | Casa: ${u.casa} | Manzana: ${u.manzana} | Lote: ${u.lote} | Año: ${u.anio} 
<button onclick="abrirFormularioEditarUsuario('${u.cedula}')">✏️ Editar</button>
<button onclick="eliminarUsuario('${u.cedula}')">❌ Eliminar</button>
</p>`;
    });
}


function cerrarListaUsuarios(){
    let lista = document.getElementById("listaUsuarios");
    lista.classList.remove("abrir");
    lista.classList.add("cerrar");
    setTimeout(() => { lista.style.display = "none"; }, 300);
}

function mostrarPagos(){
    let lista = document.getElementById("listaPagos");
    lista.classList.remove("cerrar");
    lista.classList.add("abrir");
}

function cerrarListaPagos(){
    let lista = document.getElementById("listaPagos");
    lista.classList.remove("abrir");
    lista.classList.add("cerrar");
    setTimeout(() => { lista.style.display = "none"; }, 300);
}

function abrirFormularioEditarUsuario(cedula){
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let usuario = usuarios.find(u => u.cedula === cedula);
    if(!usuario) return alert("Usuario no encontrado");

    cedulaEditar = cedula;

    document.getElementById("editarNombres").value = usuario.nombres;
    document.getElementById("editarCedula").value = usuario.cedula;
    document.getElementById("editarBarrio").value = usuario.barrio;
    document.getElementById("editarCasa").value = usuario.casa;
    document.getElementById("editarManzana").value = usuario.manzana;
    document.getElementById("editarLote").value = usuario.lote;
    document.getElementById("editarAnio").value = usuario.anio;

    let modal = document.getElementById("formularioEditarUsuario");
    modal.classList.remove("cerrar");
    modal.classList.add("abrir");
}

function cerrarFormularioEditarUsuario(){
    let modal = document.getElementById("formularioEditarUsuario");
    modal.classList.remove("abrir");
    modal.classList.add("cerrar");
    setTimeout(() => { modal.style.display = "none"; }, 300);
}

function guardarEdicionUsuario(){
    let nombres = document.getElementById("editarNombres").value.trim();
    let barrio = document.getElementById("editarBarrio").value.trim();
    let casa = document.getElementById("editarCasa").value.trim();
    let manzana = document.getElementById("editarManzana").value.trim();
    let lote = document.getElementById("editarLote").value.trim();
    let anio = document.getElementById("editarAnio").value.trim();

    if(!nombres || !barrio || !casa || !manzana || !lote || !anio){
        return alert("Complete todos los campos");
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let index = usuarios.findIndex(u => u.cedula === cedulaEditar);

    if(index !== -1){
        usuarios[index] = { nombres, cedula: cedulaEditar, barrio, casa, manzana, lote, anio };
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("✅ Usuario actualizado correctamente");
        cerrarFormularioEditarUsuario();
        mostrarUsuarios();
    }
}

// Inicializar resumen al cargar página
window.onload = function(){
    actualizarResumenPagos();
};

