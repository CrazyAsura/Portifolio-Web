# Leon Mendonça Trindade | Portfolio

Este é o repositório oficial do meu portfólio profissional, desenvolvido com foco em alta performance, design minimalista e as melhores práticas de engenharia de software.

## 🚀 Sobre o Projeto

O objetivo deste projeto é apresentar meus trabalhos, habilidades e experiências como Desenvolvedor Software Engineer de forma elegante e profissional. O portfólio foi construído utilizando tecnologias modernas do ecossistema React, garantindo uma experiência de usuário fluida e responsiva em qualquer dispositivo.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

- **[Next.js 15+](https://nextjs.org/)**: Framework React com App Router para renderização otimizada e SEO.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para maior segurança e manutenibilidade do código.
- **[Material UI (MUI)](https://mui.com/)**: Biblioteca de componentes para uma interface consistente e profissional.
- **[Redux Toolkit](https://redux-toolkit.js.org/)**: Gerenciamento de estado global (utilizado para controle de tema e preferências).
- **[Framer Motion](https://www.framer.com/motion/)**: Biblioteca para animações fluidas e interações modernas.
- **[Lucide React](https://lucide.dev/)**: Conjunto de ícones leves e elegantes.

---

## 🏗️ Arquitetura e Padrões

Seguindo os princípios de **Clean Code**, **SOLID** e **Clean Architecture**, o projeto está estruturado de forma modular:

- **Providers**: Centralização de contextos (Tema, Redux) para manter o `layout.tsx` limpo.
- **Componentes**: Divisão em componentes de layout e componentes de UI reutilizáveis.
- **Redux Slices**: Lógica de estado isolada e previsível.
- **Theming**: Sistema de cores centralizado permitindo fácil alternância entre Dark e Light mode.

---

## ✨ Funcionalidades

- **Design Responsivo**: Adaptado para mobile, tablet e desktop.
- **Dark/Light Mode**: Alternância de tema com persistência de estado.
- **Animações de Entrada**: Experiência visual rica com Framer Motion.
- **Seção de Projetos**: Vitrine de trabalhos recentes com links externos.
- **Formulário de Contato**: Integração rápida para networking.

---

## 📦 Como Executar o Projeto

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/CrazyAsura/Portifolio-Web.git
   ```

2. **Instalar as dependências:**
   ```bash
   cd front-end
   bun install
   ```

3. **Executar o servidor de desenvolvimento:**
   ```bash
   bun dev
   ```

4. **Acessar no navegador:**
   O projeto estará disponível em `http://localhost:3000`.

---

## 📂 Estrutura de Pastas

```text
front-end/
├── src/
│   ├── app/          # Rotas e páginas (Next.js App Router)
│   ├── components/   # Componentes reutilizáveis (Layout, UI)
│   ├── providers/    # Contextos e Providers (Theme, Redux)
│   ├── redux/        # Store, Hooks e Slices do Redux
│   ├── theme/        # Configurações do Material UI Theme
│   └── public/       # Ativos estáticos (Imagens, Ícones)
├── next.config.ts    # Configurações do Next.js
└── package.json      # Dependências e scripts
```

---

## 🚀 Deploy na Vercel

O projeto está configurado para um deploy simplificado na [Vercel](https://vercel.com/):

1. **Importe o repositório** no dashboard da Vercel.
2. **Configure o Root Directory**: Como o projeto está na pasta `front-end`, certifique-se de definir o `Root Directory` como `front-end` nas configurações do projeto na Vercel.
3. **Build Settings**: As configurações padrão do Next.js serão detectadas automaticamente, mas o arquivo `vercel.json` já garante os comandos corretos:
   - Build Command: `bun run build`
   - Install Command: `bun install`
4. **Environment Variables**: Caso adicione integrações futuras (como formulários ou CMS), configure as variáveis de ambiente no painel da Vercel.

---

## 👨‍💻 Desenvolvedor

**Leon Mendonça Trindade**  
*Software Engineer*

- **LinkedIn**: [leonmendoncatrindade](https://www.linkedin.com/in/leonmendoncatrindade/)
- **GitHub**: [CrazyAsura](https://github.com/CrazyAsura)
- **WhatsApp**: [+55 (79) 99957-6753](https://wa.me/5579999576753)
- **Email**: [leonmendonca@example.com](mailto:leonmendonca@example.com)

---

<p align="center">Desenvolvido com ❤️ e foco em excelência.</p>
