import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/verify")
      .then((res) => {
        if (res.data.status) {
          console.log(res.data.status);
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-4 bg-white m-3 ">
        <h4>Dashboard</h4>
        <hr />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae
          consequuntur distinctio, quasi, ipsam atque rerum ea commodi
          perferendis ratione dignissimos aperiam libero. Tempore reiciendis nam
          assumenda, inventore excepturi maxime quaerat? Lorem ipsum, dolor sit
          amet consectetur adipisicing elit. Animi aliquid repellat non, iusto
          eius vel consequatur ab impedit quis suscipit nulla laboriosam eum,
          earum adipisci tempora accusantium? Expedita nam sit earum placeat
          neque consectetur voluptatem, aspernatur vel. Quas totam harum aliquam
          molestias, praesentium quos reprehenderit voluptatibus corrupti
          tenetur commodi unde consequatur omnis, ipsum numquam, consequuntur
          quidem quibusdam. Similique ducimus dolorem maxime sunt facere,
          incidunt excepturi, neque consequatur numquam quos repudiandae enim
          deleniti doloremque ad perferendis dolore, exercitationem non esse.
          Facere modi a suscipit libero, voluptas voluptate nostrum accusantium
          quos deserunt exercitationem totam impedit ea quasi. Quae aut non nemo
          architecto cumque earum culpa eum alias aspernatur quis quas quidem
          eveniet sed, doloribus quia dignissimos nam nobis quisquam illum nihil
          officiis ab, amet, dolorem explicabo! Iusto soluta debitis quod facere
          quasi autem hic porro accusantium perferendis optio! Odio autem nemo
          aspernatur maxime rem, distinctio numquam eum facilis, repellendus,
          perferendis obcaecati pariatur necessitatibus earum neque. Optio
          aspernatur exercitationem fugiat itaque voluptatibus, voluptatem
          aliquid. Eius iusto ut mollitia soluta! Sed dolore totam, veniam cum
          consectetur ab quas sequi! Beatae dolore similique non alias fugiat
          possimus quibusdam expedita, molestias atque quis, soluta sapiente id
          magni exercitationem veniam libero quo optio? <br /> <br /> Ratione
          voluptatum aliquam laboriosam quo doloribus mollitia velit corrupti
          natus praesentium sed atque saepe necessitatibus earum a reprehenderit
          vero laborum pariatur repudiandae, illo minima cum ea asperiores.
          Perspiciatis soluta quos, vero provident odit fugiat quam repellendus
          modi voluptas et, atque itaque neque aliquam? Repellendus voluptas
          maxime sed sunt vitae. Architecto harum magni eum nisi vitae veritatis
          similique numquam minus non facilis. Eum vero, nobis laborum
          blanditiis exercitationem maiores omnis numquam, dicta eligendi,
          similique esse illum ipsum. Ea saepe inventore id aperiam officia,
          quasi eveniet consequatur excepturi placeat, vitae esse repellendus
          voluptatibus sequi blanditiis molestias harum modi porro error
          voluptas iusto asperiores, tempora ad ut. Veniam, nesciunt obcaecati
          quos quam voluptate perspiciatis amet vel impedit, eligendi rerum
          aspernatur dolores nulla nisi fuga aliquam incidunt beatae dolorem
          repellendus aperiam sed nam ipsam, adipisci id aut. Sunt doloribus ad,
          voluptas quas fugiat iusto aliquam totam excepturi quibusdam explicabo
          similique dolore neque ratione, vitae consequatur mollitia temporibus
          ipsam pariatur! Rem ut adipisci deserunt explicabo facere maiores
          laudantium quae earum blanditiis enim, fugit voluptatum incidunt
          accusantium necessitatibus molestias vel sapiente saepe? Rem, deserunt
          et esse vero veritatis eius illo minima quod ea tempore voluptatem
          architecto nemo incidunt, possimus dolore cumque obcaecati fuga
          doloremque expedita. Vitae officia veniam neque doloremque incidunt
          dolorum sint repellendus. Quaerat accusantium id culpa fugit
          repellendus sunt esse aspernatur, quos minus tenetur vero? Ipsa, eum.
          Voluptates dolores commodi quasi praesentium dignissimos distinctio
          laboriosam at iste unde, perferendis impedit in rem ipsum laudantium
          alias ab voluptatum error delectus, possimus quaerat recusandae fugiat
          molestiae excepturi. Laudantium id, placeat dolorum officiis obcaecati
          incidunt fugiat voluptatem debitis doloribus ratione laborum
          voluptatum ad officia, unde velit dicta nam necessitatibus tempora
          eveniet iusto et! Natus expedita tenetur hic deserunt dignissimos.
          Beatae iusto ut non consequatur a! Animi, illum quisquam nisi aut
          assumenda asperiores, consequuntur dolores, suscipit aliquid fugiat
          ullam totam ratione enim!
        </p>
      </div>
    </>
  );
};
export default Dashboard;
