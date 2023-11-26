import FootPrint from "@/component/footPrint/FootPrint";
import footprints from "@/data/footprint";

function FootPrintComponent() {
  return (
    <>
      {/* TODO: this must be showend to the admin alone */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
        {footprints?.map((footprint) => (
          <FootPrint key={footprint.id} footprint={footprint} />
        ))}
      </div>
    </>
  );
}

export default FootPrintComponent;
