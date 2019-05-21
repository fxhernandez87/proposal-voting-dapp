import React, { useEffect, useContext } from 'react';
import StarRatings from 'react-star-ratings';
import VotingContext from '../contexts/votingProposal';

export default ({ contract }) => {

  const context = useContext(VotingContext);

  const fetchProposalInfo = async () => {
    const proposal = await contract.methods.proposal.call();
    context.setProposal({
      text: proposal.text,
      positiveVotes: proposal.positiveVotes.toNumber(),
      negativeVotes: proposal.negativeVotes.toNumber(),
    });
  };

  useEffect(() => {
    if (contract) {
      fetchProposalInfo();
    }
  }, [contract]);

  const { proposal: {positiveVotes, negativeVotes} } = context;
  const totalVotes = positiveVotes + negativeVotes;
  const rating = totalVotes ? (positiveVotes * 5) / totalVotes : 0;
  return (
    <div>
      <h3>Proposal Ballot</h3>
      <div className="rating">
        <StarRatings
          rating={rating}
          starDimension="28px"
          starRatedColor="#7AC943"
          starEmptyColor="#4D4D4D"
          numberOfStars={5}
          name='rating'
        />
      </div>
      <p className="proposal">
        Proponemos que los consumidores, los productores, los comerciantes y supermercados, las universidades, asociaciones civiles, y el Estado coordinemos acciones para terminar de una vez por todas con el flagelo del trabajo infantil en el campo, y ocuparnos luego de erradicarlo también de cada ámbito.
        <br />
        Los responsables de controlar y generar políticas públicas que terminen con esta violación a los Derechos del Niño, no lo hacen y solo hablan de estadísticas. Estamos trabajando para no encontrar nunca más a un niño haciendo malabares, pidiendo comida o monedas en las calles, trabajando en los campos rodeados de agrotóxicos, herramientas filosas y accidentes fatales.
        <br />
        Fernando (13) Lucas (14) y Edgard (17) viajaban junto a otros 14 niños en un camión destartalado rumbo al Yerbal en Misiones. El camión desbarrancó y estos tres chicos perdieron la vida, pasando a formar parte de una estadística, seguro poco confiable. Lo que no cuentan las estadísticas lo narran los sobrevivientes: el papá de Fernando, Francisco Piñeiro, cuando se dio cuenta de que la caída era inevitable abrazó a su hijo Fernando poniendo su propio cuerpo como barrera. Nada pudo hacer y fallecieron los dos en el acto.
      </p>
    </div>
  );
}
