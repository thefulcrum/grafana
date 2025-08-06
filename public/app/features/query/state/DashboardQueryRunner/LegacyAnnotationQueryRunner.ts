import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AnnotationEvent, DataSourceApi } from '@grafana/data';
import { shouldUseLegacyRunner } from 'app/features/annotations/standardAnnotationSupport';

import { AnnotationQueryRunner, AnnotationQueryRunnerOptions } from './types';
import { handleAnnotationQueryRunnerError } from './utils';

export class LegacyAnnotationQueryRunner implements AnnotationQueryRunner {
  canRun(datasource?: DataSourceApi): boolean {
    if (!datasource) {
      return false;
    }

<<<<<<< HEAD
=======
    if (shouldUseLegacyRunner(datasource)) {
      return true;
    }

>>>>>>> v12.1.0
    return Boolean(datasource.annotationQuery && !datasource.annotations);
  }

  run({ annotation, datasource, dashboard, range }: AnnotationQueryRunnerOptions): Observable<AnnotationEvent[]> {
    if (!this.canRun(datasource)) {
      return of([]);
    }

<<<<<<< HEAD
    return from(datasource!.annotationQuery!({ range, rangeRaw: range.raw, annotation, dashboard })).pipe(
      catchError(handleAnnotationQueryRunnerError)
    );
=======
    if (datasource?.annotationQuery === undefined) {
      console.warn('datasource does not have an annotation query');
      return of([]);
    }

    const annotationQuery = datasource.annotationQuery({ range, rangeRaw: range.raw, annotation, dashboard });
    if (annotationQuery === undefined) {
      console.warn('datasource does not have an annotation query');
      return of([]);
    }

    return from(annotationQuery).pipe(catchError(handleAnnotationQueryRunnerError));
>>>>>>> v12.1.0
  }
}
