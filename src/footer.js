export const createFooter = () => {
   let footer = document.createElement('footer');
   let authorDiv = document.createElement('div');
   authorDiv.classList.add('author-div');
   let p = document.createElement('p');
   p.classList.add('author-p');
   p.textContent = 'Made by ';
   authorDiv.append(p);
   let a = document.createElement('a');
   a.classList.add('author-anchor');
   a.textContent = 'Roman Grekhov';
   a.setAttribute('href', 'https://github.com/Kestrel-72');
   let githubLogo = document.createElement('img');
   githubLogo.classList.add('logo-github')
   githubLogo.setAttribute('src', 'src/github-mark.png');
   githubLogo.setAttribute('width', '30px');
   a.append(githubLogo);
   p.append(a);
   footer.append(authorDiv);
   return footer;
}
