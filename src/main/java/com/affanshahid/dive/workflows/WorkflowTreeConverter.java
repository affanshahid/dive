package com.affanshahid.dive.workflows;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.affanshahid.dive.workflow.Node;
import com.affanshahid.dive.workflow.Port;
import com.affanshahid.dive.workflow.WorkflowTree;
import com.affanshahid.dive.workflows.dto.NodeDTO;
import com.affanshahid.dive.workflows.dto.PortDTO;
import com.affanshahid.dive.workflows.dto.WorkflowTreeDTO;

import org.springframework.stereotype.Component;

@Component
public class WorkflowTreeConverter {

    public WorkflowTreeDTO toDTO(WorkflowTree tree) {
        var builder = new WorkflowTreeDTOBuilder(tree);
        return builder.build();
    }

    public WorkflowTree fromDTO(WorkflowTreeDTO dto) throws ConversionException {
        var builder = new WorkflowTreeBuilder(dto);
        try {
            return builder.build();
        } catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException
                | NoSuchMethodException | SecurityException | ClassNotFoundException e) {
            throw new ConversionException(e);
        }
    }

    private static class WorkflowTreeBuilder {
        private Set<NodeDTO<?>> nodeDtos;
        private Set<PortDTO> portDtos;
        private String rootId;

        private List<Node<?>> nodes;
        private Map<String, Port> ports;

        public WorkflowTreeBuilder(WorkflowTreeDTO dto) {
            nodes = new ArrayList<>();
            ports = new HashMap<>();

            this.nodeDtos = dto.getNodes().stream().collect(toSet());
            this.portDtos = dto.getPorts().stream().collect(toSet());
            this.rootId = dto.getRoot();
        }

        public WorkflowTree build() throws InstantiationException, IllegalAccessException, IllegalArgumentException,
                InvocationTargetException, NoSuchMethodException, SecurityException, ClassNotFoundException {
            for (var dto : nodeDtos) {
                nodes.add(createNode(dto));
            }

            for (var dto : portDtos) {
                var port = ports.get(dto.getId());
                port.setId(dto.getId());
                port.setLabel(dto.getLabel());
                for (var connId : dto.getConnections()) {
                    port.addConnection(ports.get(connId));
                }
            }

            var root = nodes.stream().filter(n -> n.getId().equals(rootId)).findFirst().get();
            return new WorkflowTree(root);
        }

        private <T> Node<T> createNode(NodeDTO<T> dto)
                throws InstantiationException, IllegalAccessException, IllegalArgumentException,
                InvocationTargetException, NoSuchMethodException, SecurityException, ClassNotFoundException {
            @SuppressWarnings("unchecked")
            var node = (Node<T>) Class.forName(dto.getClassName()).getConstructor(String.class, String.class)
                    .newInstance(dto.getId(), dto.getLabel());

            node.setConfig(dto.getConfig());

            for (int i = 0; i < dto.getInputPorts().size(); i++) {
                ports.put(dto.getInputPorts().get(i), node.getInputPort(i));
            }

            for (int i = 0; i < dto.getOutputPorts().size(); i++) {
                ports.put(dto.getOutputPorts().get(i), node.getOutputPort(i));
            }

            return node;
        }
    }

    private static class WorkflowTreeDTOBuilder {
        private Set<NodeDTO<?>> nodes;
        private Set<PortDTO> ports;
        private String root;

        public WorkflowTreeDTOBuilder(WorkflowTree workflow) {
            this.root = workflow.getRoot().getId();
            nodes = new HashSet<>();
            ports = new HashSet<>();

            visitNode(workflow.getRoot());
        }

        public WorkflowTreeDTO build() {
            WorkflowTreeDTO dto = new WorkflowTreeDTO();

            dto.setRoot(root);
            dto.setNodes(nodes.stream().collect(toList()));
            dto.setPorts(ports.stream().collect(toList()));

            return dto;
        }

        private <T> void visitNode(Node<T> node) {
            nodes.add(nodeToDTO(node));

            for (var port : node.getInputPorts()) {
                ports.add(portToDTO(port));
            }

            for (var port : node.getOutputPorts()) {
                ports.add(portToDTO(port));

                for (var connectedPort : port.getConnections()) {
                    visitNode(connectedPort.getNode());
                }
            }
        }

        private <T> NodeDTO<T> nodeToDTO(Node<T> node) {
            NodeDTO<T> dto = new NodeDTO<>();

            dto.setId(node.getId());
            dto.setLabel(node.getLabel());
            dto.setConfig(node.getConfig());
            dto.setClassName(node.getClass().getCanonicalName());
            dto.setInputPorts(node.getInputPorts().stream().map(Port::getId).collect(toList()));
            dto.setOutputPorts(node.getOutputPorts().stream().map(Port::getId).collect(toList()));

            return dto;
        }

        private PortDTO portToDTO(Port port) {
            PortDTO dto = new PortDTO();

            dto.setId(port.getId());
            dto.setLabel(port.getLabel());
            dto.setNode(port.getNode().getId());
            dto.setConnections(port.getConnections().stream().map(Port::getId).collect(toList()));

            return dto;
        }
    }
}