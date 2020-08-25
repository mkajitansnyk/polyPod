package eu.polypoly.pod.android.polyIn.rdf

import eu.polypoly.bubblewrap.Codec

data class IRI(val iri: String) {

    companion object {
        val codec: Codec<IRI> =
            Codec.kvArray(Codec.string, Codec.string)
                .xmap(
                    {
                        val iri = it["value"] ?: throw IllegalArgumentException("Expected value")
                        IRI(iri)
                    },
                    { mapOf(Pair("value", it.iri)) }
                )
                .taggedClass("@polypoly-eu/rdf.NamedNode")
    }

}
