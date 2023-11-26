import Integration from "@/component/integration/Integration";
import integrations from "@/data/intigration";

function Integrations() {
  return (
    <>
      <button>sefsdf</button>
      {integrations?.map((integration) => (
        <Integration key={integration.id} integration={integration} />
      ))}
    </>
  );
}

export default Integrations;
