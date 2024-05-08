type ServiceHealthProps = {
  health: boolean;
};

function ServiceHealth(props: Readonly<ServiceHealthProps>) {
  return <div>Service Health</div>;
}

export default ServiceHealth;
