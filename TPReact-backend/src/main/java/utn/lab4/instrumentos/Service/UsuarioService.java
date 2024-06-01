package utn.lab4.instrumentos.Service;

import utn.lab4.instrumentos.Entity.Usuario;
import utn.lab4.instrumentos.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<Usuario> login(String nombreUsuario, String clave) {
        String encriptada = passwordEncoder.encode(clave);
        return usuarioRepository.findByNombreUsuarioAndClave(nombreUsuario, encriptada);
    }

    @Override
    public UserDetails loadUserByUsername(String nombreUsuario) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByNombreUsuario(nombreUsuario)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + nombreUsuario));
        return org.springframework.security.core.userdetails.User.withUsername(usuario.getNombreUsuario())
                .password(usuario.getClave())
                .roles(usuario.getRol())
                .build();
    }


    public void init() {
        // Crear un usuario de ejemplo al iniciar la aplicación
        if (usuarioRepository.findByNombreUsuario("admin").isEmpty()) {
            Usuario usuario = new Usuario();
            usuario.setNombreUsuario("admin");
            usuario.setClave(passwordEncoder.encode("admin123"));
            usuario.setRol("Admin");
            usuarioRepository.save(usuario);
        }
    }
}