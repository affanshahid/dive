import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout';
import DesignerSkeleton from './DesignerSkeleton';
import WorkflowEditor from './WorkflowEditor';

function ViewWorkflow() {
  const { workflowId } = useParams<any>();

  return (
    <Layout>
      <Suspense fallback={<DesignerSkeleton />}>
        <WorkflowEditor workflowId={workflowId} />
        {/* <DesignerSkeleton /> */}
      </Suspense>
    </Layout>
  );
}

export default ViewWorkflow;
