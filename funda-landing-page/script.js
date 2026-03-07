document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-list li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (mobileBtn) {
                const icon = mobileBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Animação suave nos links âncora e fechar menu p/ scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Validação do Formulário
    const form = document.getElementById('orcamentoForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nome = document.getElementById('nome');
            const telefone = document.getElementById('telefone');
            const email = document.getElementById('email');

            const errorNome = document.getElementById('nomeError');
            const errorTelefone = document.getElementById('telefoneError');
            const errorEmail = document.getElementById('emailError');

            [nome, telefone, email].forEach(el => el.classList.remove('input-error'));
            [errorNome, errorTelefone, errorEmail].forEach(el => el.textContent = '');

            if (nome.value.trim().length < 3) {
                nome.classList.add('input-error');
                errorNome.textContent = 'Por favor, insira seu nome completo.';
                isValid = false;
            }

            const phoneRegex = /^[0-9\-\+\s\(\)]{10,15}$/;
            if (!phoneRegex.test(telefone.value.trim())) {
                telefone.classList.add('input-error');
                errorTelefone.textContent = 'Insira um telefone válido.';
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                email.classList.add('input-error');
                errorEmail.textContent = 'Insira um e-mail válido.';
                isValid = false;
            }

            if (isValid) {
                const submitBtn = document.getElementById('submitBtn');
                const originalText = submitBtn.textContent;

                submitBtn.textContent = 'Redirecionando...';
                submitBtn.disabled = true;

                const cidadeInfo = document.getElementById('cidade').value.trim();
                const tipoObraInfo = document.getElementById('tipoObra').value || 'Não informado';
                const mensagemInfo = document.getElementById('mensagem').value.trim();

                let wppMsg = `Olá! Gostaria de falar com um engenheiro.\n\n*Dados do solicitante:*\nNome: ${nome.value.trim()}\nTelefone: ${telefone.value.trim()}\nEmail: ${email.value.trim()}\nCidade: ${cidadeInfo}\nTipo de obra: ${tipoObraInfo}`;
                if (mensagemInfo) {
                    wppMsg += `\n\n*Mensagem:*\n${mensagemInfo}`;
                }

                const encodedMsg = encodeURIComponent(wppMsg);
                const whatsappUrl = `https://wa.me/553189102831?text=${encodedMsg}`;

                window.open(whatsappUrl, '_blank');

                setTimeout(() => {
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
            }
        });

        form.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', function () {
                if (this.classList.contains('input-error')) {
                    this.classList.remove('input-error');
                    const errorSpan = document.getElementById(this.id + 'Error');
                    if (errorSpan) errorSpan.textContent = '';
                }
            });
        });
    }
});
