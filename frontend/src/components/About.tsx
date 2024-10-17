import { Truck } from "lucide-react";
import about from "../assets/logo-large.png";

const About = () => {
  return (
    <section className="max-padd-container py-12 xl:py-12">
      {/* container */}
      <div>
        {/* left */}
        <div>
          <h3>Unveleiling Our Product's Key Features!</h3>
          <p>Aqui tem uma descrição</p>
          <div>
            {/* Truck */}
            <div>
              <div>
                <Truck />
              </div>
              <div>
                <h4>Easy Returns Process</h4>
                <p>Aqui tem uma descrição</p>
              </div>
            </div>
            {/* Truck */}
            <div>
              <div>
                <Truck />
              </div>
              <div>
                <h4>Easy Returns Process</h4>
                <p>Aqui tem uma descrição</p>
              </div>
            </div>
            {/* Truck */}
            <div>
              <div>
                <Truck />
              </div>
              <div>
                <h4>Easy Returns Process</h4>
                <p>Aqui tem uma descrição</p>
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div>
          <div>
            <img src={about} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
