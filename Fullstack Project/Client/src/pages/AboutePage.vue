<template>
  <div id="about-page">
    <div class="about-section">
      <br>
      <h1>The Faces Behind</h1>
      <h1>DEV <font-awesome-icon icon="cookie-bite" size="md"/> UR</h1>
      <br>
      <div style="width: 50%; margin-left: 25%;">
        <h3 >We are students from BGU University,
           finishing our third year for Software and Information Systems Engineering.</h3>
      </div>
    </div>
    <br>
    <div class="avatars">
      <div>
        <div class="avatar-card">
          <img id="dekel" src="../assets/Eitan.jpg" alt="Jane" />
          <div class="container">
            <h2>Eitan Platok</h2>
            <h3>Developer</h3>
            <h4>Student at SISE Department</h4>
            <h4 class="email-avatar">eitanpl@post.bgu.ac.il</h4>
          </div>
        </div>
      </div>
      <div>
        <div class="avatar-card">
          <img src="../assets/David.jpg" alt="John" />
          <div class="container">
            <h2>David Fadida</h2>
            <h3>Developer</h3>
            <h4>Student at SISE Department</h4>
            <h4 class="email-avatar">davidfad@post.bgu.ac.il</h4>
          </div>
        </div>
      </div>
    </div>
    <br><br>
    <div id="extraProjects" style="text-align:center">
      <h3>PROJECTS</h3>
      <h3>
        <a href="https://sise-web-development-environments.github.io/assignment2-eitan-and-david"
        > Pacman </a>
         <span class="seperator"></span> 
        <a href="https://sise-web-development-environments.github.io/313125353/"
        > Eitan </a>
         <span class="seperator"></span>  
        <a href="https://sise-web-development-environments.github.io/assignment1-David-Fadida/"
        > David </a>
      </h3>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#about-page .seperator {
  border-left: 2px solid #333333;
  margin: 10px 30px;
  font-size: 80%;
}

#about-page {
  font-family: 'Palanquin Dark';
}
#about-page img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: #333333 solid 3px;
}
.about-section {
  text-align: center;
}
.avatars {
  display: grid;
  grid-template-columns: repeat(2, 23%);
  grid-gap: 4%;
  width: 100%;
  justify-items: center;
  align-items: center;
  justify-content: center;
}

.avatar-card{
  text-align: center !important;
}

.email-avatar {
  background-color: #333333;
  color: whitesmoke;
  padding: 5px;
}
</style>